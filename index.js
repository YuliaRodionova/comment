let form = document.forms.form;
const commentText = form.comment;
const userName = form.name;

commentText.onblur = (e) => validate(e.target);
commentText.oninput = (e) => validate(e.target);
userName.onblur = (e) => validate(e.target);
userName.oninput = (e) => validate(e.target);

function validate(element) {
    let isValid = false;
    if (element.value.replace(/ /g, '') === '') {
        element.classList.add('invalid');
        let error = document.createElement('div');
        error.className = 'error';
        error.innerHTML = 'Пожалуйста, заполните поле';

        if (!element.nextElementSibling) {
            element.after(error);
        }
        isValid = false;

    } else {
        element.classList.remove('invalid');
        if (element.nextElementSibling) {
            element.nextSibling.remove();
        }
        isValid = true;
    }

    return isValid;
}

form.onsubmit = function (event) {
    event.preventDefault();
    const commentText = event.target.comment;
    const userName = event.target.name;
    validate(commentText);
    validate(userName);

    const currentDate = new Date();
    const currentDateDay = currentDate.toISOString().split('T')[0];
    const currentDateTime = `${getZero(currentDate.getHours())}:${getZero(currentDate.getMinutes())}`;
    const commentDate = event.target.date.value ? event.target.date.value : currentDateDay;

    const date1 = new Date(currentDateDay);
    const date2 = new Date(commentDate);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let dateName;

    switch (diffDays) {
        case 0:
            dateName = `сегодня`;
            break;
        case 1:
            dateName = `вчера`;
            break;
        default:
            dateName = commentDate;
    }


    function getZero(num) {
        if (num > 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    const userComment = document.createElement('div');
    userComment.classList.add('comment-item');
    const likeButton = document.createElement('button');
    likeButton.classList.add('comment-item__like-button');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('comment-item__delete-button');
    likeButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.99998 17.5C9.46248 17.0233 8.85498 16.5275 8.21248 16H8.20415C5.94165 14.15 3.37748 12.0566 2.24498 9.54829C1.87291 8.74973 1.67573 7.8809 1.66664 6.99996C1.66415 5.7912 2.14895 4.63245 3.01149 3.7856C3.87402 2.93875 5.04147 2.47529 6.24998 2.49996C7.23384 2.50151 8.19651 2.78586 9.02331 3.31913C9.38662 3.55493 9.71533 3.84017 9.99998 4.16663C10.2862 3.84145 10.615 3.55638 10.9775 3.31913C11.8039 2.78576 12.7664 2.50139 13.75 2.49996C14.9585 2.47529 16.1259 2.93875 16.9885 3.7856C17.851 4.63245 18.3358 5.7912 18.3333 6.99996C18.3248 7.88231 18.1276 8.75262 17.755 9.55246C16.6225 12.0608 14.0591 14.1533 11.7966 16L11.7883 16.0066C11.145 16.5308 10.5383 17.0266 10.0008 17.5066L9.99998 17.5ZM6.24998 4.16663C5.47374 4.15691 4.72504 4.454 4.16665 4.99329C3.62863 5.52176 3.32794 6.24583 3.33324 6.99996C3.34275 7.64204 3.48817 8.27484 3.75998 8.85663C4.29457 9.93888 5.0159 10.9183 5.89081 11.75C6.71665 12.5833 7.66665 13.39 8.48831 14.0683C8.71581 14.2558 8.94748 14.445 9.17915 14.6341L9.32498 14.7533C9.54748 14.935 9.77748 15.1233 9.99998 15.3083L10.0108 15.2983L10.0158 15.2941H10.0208L10.0283 15.2883H10.0325H10.0366L10.0516 15.2758L10.0858 15.2483L10.0916 15.2433L10.1008 15.2366H10.1058L10.1133 15.23L10.6666 14.7758L10.8116 14.6566C11.0458 14.4658 11.2775 14.2766 11.505 14.0891C12.3266 13.4108 13.2775 12.605 14.1033 11.7675C14.9783 10.9363 15.6997 9.95705 16.2341 8.87496C16.5109 8.28813 16.6584 7.64871 16.6667 6.99996C16.6701 6.24816 16.3696 5.52687 15.8333 4.99996C15.276 4.45823 14.5272 4.1587 13.75 4.16663C12.8016 4.15857 11.8949 4.5561 11.2583 5.25913L9.99998 6.70913L8.74165 5.25913C8.10503 4.5561 7.19838 4.15857 6.24998 4.16663Z" />
            </svg>`;
    deleteButton.innerHTML = `<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;
    likeButton.onclick = function () {
        this.classList.toggle("liked");
    }
    deleteButton.onclick = function () {
        this.parentNode.remove();
    }

    if (validate(commentText) && validate(userName)) {
        let divName = document.createElement('div');
        divName.classList.add('comment-item__name');
        divName.innerHTML = `${userName.value} ${dateName} ${currentDateTime}`;
        userComment.append(divName);
        let divText = document.createElement('div');
        divText.classList.add('comment-item__text');
        divText.innerHTML = commentText.value;
        userComment.append(divText);
        userComment.append(likeButton, deleteButton);
        comments.appendChild(userComment);
    }



}

