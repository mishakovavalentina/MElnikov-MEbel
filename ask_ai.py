"""
ask_ai.py — отправляет запрос к OpenAI и выводит ответ в консоль.
Требования: pip install openai python-dotenv
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Загружаем .env из той же папки, что и скрипт
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

api_key = os.getenv("OPENAI_API_KEY")

if not api_key or api_key.startswith("["):
    print("Ошибка: OPENAI_API_KEY не задан.")
    print("Откройте файл .env и замените плейсхолдер на реальный ключ sk-...")
    raise SystemExit(1)

from openai import OpenAI

client = OpenAI(api_key=api_key)

prompt = (
    "Придумай 3 креативных названия для моего проекта: "
    "интернет-магазин мебели ручной работы от мастера Мельникова"
)

print("Отправляю запрос к OpenAI...\n")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.9,
)

answer = response.choices[0].message.content
print("=== Ответ OpenAI ===")
print(answer)
