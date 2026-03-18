import os
from dotenv import load_dotenv
from openai import OpenAI

# Загружаем переменные из .env
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key or api_key.startswith("["):
    print("Ошибка: OPENAI_API_KEY не задан. Отредактируйте файл .env и вставьте свой ключ.")
    exit(1)

client = OpenAI(api_key=api_key)

prompt = (
    "Придумай 3 креативных названия для моего проекта: "
    "интернет-магазин мебели MElnikov-MEbel, предлагающий стильную и качественную мебель на заказ."
)

print("Отправляю запрос к OpenAI...\n")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
)

answer = response.choices[0].message.content
print("Ответ от OpenAI:")
print(answer)
