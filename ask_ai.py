import json
import os
import sys
import urllib.request
import urllib.error


def mask_secret(value: str) -> str:
    v = value.strip()
    if len(v) <= 8:
        return "*" * len(v)
    return f"{v[:6]}...{v[-4:]}"


def load_api_key() -> str:
    """
    Читает OPENAI_API_KEY из файла .env в текущей директории.
    Формат строки: OPENAI_API_KEY=sk-...
    """
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if not os.path.exists(env_path):
        raise RuntimeError(f"Файл .env не найден по пути: {env_path}")

    api_key = None
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if line.startswith("OPENAI_API_KEY="):
                api_key = line.split("=", 1)[1].strip()
                break

    if not api_key:
        raise RuntimeError("В .env не найдена переменная OPENAI_API_KEY.")

    # Лёгкая диагностика без утечки секрета: путь и маска ключа.
    print(f"Использую .env: {env_path}")
    print(f"OPENAI_API_KEY: {mask_secret(api_key)}")

    if "REPLACE_WITH_YOUR_KEY" in api_key:
        raise RuntimeError(
            "Похоже, в .env всё ещё стоит плейсхолдер sk-REPLACE_WITH_YOUR_KEY. "
            "Замените его на реальный ключ."
        )

    return api_key


def get_project_description_from_args_or_input() -> str:
    """
    Берет описание проекта из аргументов командной строки,
    иначе спрашивает у пользователя.
    """
    if len(sys.argv) > 1:
        return " ".join(sys.argv[1:]).strip()

    return input("Опишите ваш проект одним предложением: ").strip()


def ask_openai_for_names(api_key: str, project_description: str) -> str:
    """
    Отправляет запрос к OpenAI Chat Completions API и возвращает текст ответа.
    """
    url = "https://api.openai.com/v1/chat/completions"

    system_prompt = "Ты креативный нейминг-ассистент. Придумывай короткие, запоминающиеся названия."
    user_prompt = (
        "Придумай 3 креативных названия для моего проекта: "
        f"{project_description}"
    )

    payload = {
        "model": "gpt-4.1-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.8,
        "n": 1,
    }

    data = json.dumps(payload).encode("utf-8")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    req = urllib.request.Request(url, data=data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req) as resp:
            resp_body = resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Ошибка HTTP {e.code} при запросе к OpenAI API:\n{error_body}"
        ) from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Ошибка сети при запросе к OpenAI API: {e}") from e

    try:
        resp_json = json.loads(resp_body)
    except json.JSONDecodeError:
        raise RuntimeError(f"Не удалось распарсить ответ OpenAI:\n{resp_body}")

    try:
        return resp_json["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError) as e:
        raise RuntimeError(f"Неожиданная структура ответа OpenAI:\n{resp_body}") from e


def main() -> None:
    try:
        api_key = load_api_key()
        project_description = get_project_description_from_args_or_input()

        if not project_description:
            print("Описание проекта пустое. Перезапустите скрипт и введите описание.")
            return

        print("Отправляю запрос к OpenAI API...\n")
        answer = ask_openai_for_names(api_key, project_description)

        print("Ответ модели:")
        print("--------------------")
        print(answer)
        print("--------------------")
    except Exception as e:
        print("Произошла ошибка при выполнении скрипта:")
        print(e)


if __name__ == "__main__":
    main()

