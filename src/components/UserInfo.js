export class UserInfo {
  constructor(nameSelector, professionSelector, avatarPhotoSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
    this._avatarPhotoElement = document.querySelector(avatarPhotoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent,
      photoLink: this._avatarPhotoElement.src
    }
  }

  setUserInfo(name, profession) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
  }

  setAvatarPhoto(photoLink) {
    this._avatarPhotoElement.src = photoLink;
  }
}