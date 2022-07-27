function handleHomePage() {
    try {
        window.location.href = "./home.html";
    } catch (error) {
        console.error(error);
    }
}

function handleAddFriendPage() {
    try {
        window.location.href = "./add-friend.html";
    } catch (error) {
        console.error(error);
    }
}

function handleSettingPage() {
    try {
        window.location.href = "./user-setting.html";
    } catch (error) {
        console.error(error);
    }
}

async function handleLoad() {
    try {
        handleGetUser();
        getAllFriends();
    } catch (error) {
        console.error(error);
    }
}

async function handleGetUser() {
    try {
        //@ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Couldn't recieve data from axios GET: '/users/get-user' ");
        // console.log(data);

        const { userDB, error } = data;
        if (error) throw error;

        // console.log(userDB);

        const username = document.getElementById("usernameBox") as HTMLHeadingElement;
        username.innerHTML = userDB.username;

        const greetUser = document.getElementById("greetingUser") as HTMLHeadingElement;
        if (greetUser) greetUser.innerHTML = `Hello ${userDB.username}`;

        return userDB;
    } catch (error) {
        console.error(error);
    }
}

async function getAllFriends() {
    try {
        const userDB = await handleGetUser();
        if (!userDB) throw new Error("Couldn't get User");
        //@ts-ignore
        const { data } = await axios.post('/friends/get-friends', { userDB });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/friends/get-friends' ");
        console.log(data);

    } catch (error) {
        console.error(error);
    }
}
