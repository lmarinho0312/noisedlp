import shutil
import os

user_uploaded_dir = r"C:\Users\Usuario\.gemini\antigravity\brain\4a88d3eb-67da-4d54-b010-a497af5a2339\.user_uploaded"
target_img_dir = r"c:\Users\Usuario\Documents\noised\assets\images"
backup_img_dir = r"c:\Users\Usuario\Documents\noised_backup\assets\images"

img_deck = os.path.join(user_uploaded_dir, "media__1784667551958.jpg")
img_stage = os.path.join(user_uploaded_dir, "media__1784667551960.jpg")

# Copy stage sunset photo to hero-stage.jpg
if os.path.exists(img_stage):
    shutil.copy(img_stage, os.path.join(target_img_dir, "hero-stage.jpg"))
    shutil.copy(img_stage, os.path.join(backup_img_dir, "hero-stage.jpg"))
    print("Copied real stage sunset photo to hero-stage.jpg!")

# Copy Dedo de Deus silhouette deck photo to location-panorama.jpg
if os.path.exists(img_deck):
    shutil.copy(img_deck, os.path.join(target_img_dir, "location-panorama.jpg"))
    shutil.copy(img_deck, os.path.join(backup_img_dir, "location-panorama.jpg"))
    print("Copied real Dedo de Deus deck photo to location-panorama.jpg!")
