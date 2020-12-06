class UserInfo {
    constructor (name, job, avatar){
      this.nameText = name;
      this.jobText = job;
      this.avatarElement = avatar;
    }

    setUserInfo = (name, job, avatar) => {
      this.name = name;
      this.job = job;
      this.avatar= avatar;
    }

    showInfo(name, about){
      name.value = this.nameText.textContent
      about.value = this.jobText.textContent
    }

    updateUserInfo = () => {
      this.nameText.textContent = this.name;
      this.jobText.textContent = this.job;
    }

    updateFromServer(res){
      this.nameText.textContent = res.name;
      this.jobText.textContent = res.about;
      this.avatarElement.style.backgroundImage=`url(${res.avatar})`;
    }

  }