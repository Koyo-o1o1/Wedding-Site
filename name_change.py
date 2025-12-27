import os

# 写真が入っているフォルダの絶対パス
folder_path = r"C:\Users\koyo\Desktop\app\Wedding\images\photo"

# 対象とする拡張子
extensions = (".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG")

files = [
    f for f in os.listdir(folder_path)
    if f.lower().endswith(extensions)
]

# 一時的に名前を変える（上書き防止）
temp_names = []
for i, filename in enumerate(files):
    old_path = os.path.join(folder_path, filename)
    temp_name = f"__temp__{i}"
    temp_path = os.path.join(folder_path, temp_name)
    os.rename(old_path, temp_path)
    temp_names.append((temp_name, filename))

# 1, 2, 3, ... にリネーム
for i, (temp_name, original_name) in enumerate(temp_names, start=1):
    _, ext = os.path.splitext(original_name)
    new_name = f"{i}{ext}"
    temp_path = os.path.join(folder_path, temp_name)
    new_path = os.path.join(folder_path, new_name)
    os.rename(temp_path, new_path)

print("リネーム完了")
