const followers = document.querySelector(".list-followers")
const feedposts = document.querySelector(".list-posts")
const modal = document.querySelector(".modal-container")
const topSection = document.querySelector(".section-top")


function createUserPost(post, userArray) {
    const output = { ...post, userData: null };
    for (const user of userArray) {
        if (user.id === post.user) {
            output.userData = user
        }
    }
    return output

}

function createFollower(user, parentElement) {
    const userCard = document.createElement("li")
    const userImg = document.createElement("img")
    const divtext = document.createElement("div")
    const userName = document.createElement("span")
    const userDescription = document.createElement("span")
    const userContainer = document.createElement("div")
    const followerButton = document.createElement("button")

    userImg.src = user.img
    userName.innerText = user.user
    userDescription.innerText = user.stack || ''
    followerButton.innerText = "Seguir"

    userCard.classList.add("user-follower")
    userImg.classList.add("user-img")
    divtext.classList.add("text-user")
    userName.classList.add("user-name")
    userDescription.classList.add("user-description")
    userContainer.classList.add("user-container")
    followerButton.classList.add("follower-button")

    followerButton.addEventListener("click", () => {
        followerButton.classList.toggle("show-button")

        if (followerButton.classList.contains("show-button")) {
            followerButton.innerText = "Seguindo"

        } else {
            followerButton.innerText = "Seguir"
        }
    })

    userContainer.appendChild(userImg)
    divtext.appendChild(userName)
    divtext.appendChild(userDescription)
    userContainer.appendChild(divtext)
    userCard.appendChild(userContainer)
    userCard.appendChild(followerButton)
    parentElement.appendChild(userCard)
}

const mediaWatcher = window.matchMedia('(min-width: 800px)')
mediaWatcher.addEventListener('change', renderFollowers)

function renderFollowers() {
    let userList = users;
    if (mediaWatcher.matches) {
        userList = [];
        for (const index of [1, 2, 5]) {
            userList.push(users[index])
        }
    }
    followers.innerHTML = '';
    for (const user of userList) {
        createFollower(user, followers)
    }
}
renderFollowers()

function createPost(post, parentElement) {
    const like = document.querySelector(".icone").cloneNode();
    const likeCount = document.createElement('span');
    const itemuser = document.createElement("li")
    const postContainer = document.createElement("div")
    const imageUser = document.createElement("img")
    const divnames = document.createElement("div")
    const name = document.createElement("span")
    const description = document.createElement("span")
    const namePost = document.createElement("span")
    const descriptionPost = document.createElement("p")
    const postFooter = document.createElement("div")
    const openButton = document.createElement("button")
    let likeCounter = 0

    imageUser.src = post.userData.img
    name.innerText = post.userData.user
    description.innerText = (post.userData || {stack: ''}).stack
    namePost.innerText = post.title
    descriptionPost.innerText = post.text.slice(0, 182)
    openButton.innerText = "Abrir Post"
    likeCount.textContent = likeCounter;


    imageUser.classList.add("user-img")
    name.classList.add("user-name")
    description.classList.add("user-description")
    namePost.classList.add("name-post")
    descriptionPost.classList.add("description-post")
    openButton.classList.add("open-button")
    divnames.classList.add("names")
    postContainer.classList.add("post-container")
    itemuser.classList.add("item-user")
    like.classList.remove("hidden")
    openButton.dataset.id = post.id
    likeCount.classList.add("like")


    openButton.addEventListener("click", () => {
        createModal(post, modal, openButton.dataset.id)
        modal.showModal()
    })

    like.addEventListener("click", () => {
        like.classList.toggle("icone-show")
        if (like.classList.contains("icone-show")) {
            likeCounter++;
        } else {
            likeCounter--;
        }
        likeCount.textContent = likeCounter;
    })


    postContainer.appendChild(imageUser)
    divnames.appendChild(name)
    divnames.appendChild(description)
    postContainer.appendChild(divnames)
    itemuser.appendChild(postContainer)
    itemuser.appendChild(namePost)
    itemuser.appendChild(descriptionPost)
    itemuser.appendChild(postFooter)
    postFooter.append(openButton, like, likeCount)
    parentElement.appendChild(itemuser)
}

for (const post of posts) {
    createPost(createUserPost(post, users), feedposts)
}

function createModal(post, parentElement, id) {
    const modalContainer = document.createElement("div")
    const divHeader = document.createElement("div")
    const divContainer = document.createElement("div")
    const modalImage = document.createElement("img")
    const divnames = document.createElement("div")
    const modalName = document.createElement("span")
    const modalDescription = document.createElement("span")
    const modalNamePost = document.createElement("span")
    const modalDescriptionPost = document.createElement("p")
    const divBtn = document.createElement("div")
    const closeButton = document.createElement("span")


    modalImage.src = post.userData.img
    modalName.innerText = post.userData.user
    modalDescription.innerText = post.userData.stack
    modalNamePost.innerText = post.title
    modalDescriptionPost.innerText = post.text
    closeButton.innerText = "X"

    modalImage.classList.add("user-img")
    modalName.classList.add("user-name")
    modalDescription.classList.add("user-description")
    modalNamePost.classList.add("modal-name-post")
    modalDescriptionPost.classList.add("modal-description-post")
    divnames.classList.add("names")
    divContainer.classList.add("container")
    modalContainer.classList.add("modal")
    divHeader.classList.add("div-header")
    divBtn.classList.add("div-btn")
    closeButton.classList.add("close-btn")

    closeButton.addEventListener("click", () => {
        modal.close()

    })

    divHeader.append(divContainer, modalNamePost, modalDescriptionPost)
    divnames.append(modalName, modalDescription)
    divContainer.append(modalImage, divnames)
    divBtn.appendChild(closeButton)
    modalContainer.append(divBtn, divHeader)
    parentElement.innerHTML = '';
    parentElement.appendChild(modalContainer)

}