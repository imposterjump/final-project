function delete_users_from_arr() {

}

class user {
    constructor(name, username, password, email, address, phone_number) {
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
        this.address = address;
        this.phone_number = phone_number;
    }
}


//--trying users 

let i = new user("bassem mohamed moustafa", "jump", "jump18", "jump@gmail.com", "nasr city", "01555076499");
let x = new user("abdelrahman mansy", "mansy22", "lololo", "aloooo@gmail.com", "rehab city", "01000076499");
let users = [i, x];
// trying product;



let products = [j, b];





function generate_users_tabs(num) {



    var all_users = document.getElementById("userscontainer");
    while (all_users.firstChild) {
        console.log("i am deleting user");
        all_users.removeChild(all_users.firstChild);
    }


    if (num == 0) {
        for (x = 0; x < users.length; x++) {

            var all_users = document.getElementById("userscontainer");
            const new_div = document.createElement("div");
            const div_text = document.createTextNode("username: " + users[x].username + "                 email: " + users[x].email);
            new_div.appendChild(div_text);
            new_div.id = users[x].username;

            var buttonE2 = document.createElement("button");
            var buttonTextE2 = document.createElement("a");
            buttonE2.className = "buttons";
            buttonTextE2.innerText = " Delete ";
            buttonE2.appendChild(buttonTextE2);
            buttonE2.onclick = delete_users_from_arr();
            new_div.appendChild(buttonE2);


            var buttonEl = document.createElement("button");
            var buttonTextEl = document.createElement("a");
            buttonEl.className = "buttons";
            buttonTextEl.innerText = " Edit ";
            buttonEl.appendChild(buttonTextEl);
            new_div.appendChild(buttonEl);




            new_div.classList = "user_infos";


            all_users.appendChild(new_div);

        }

    } else {
        for (x = 0; x < users.length; x++) {
            let s = document.getElementById("search_bar_users").value;
            let result = s.trim();
            if ((users[x].username).includes(result)) {

                var all_users = document.getElementById("userscontainer");
                const new_div = document.createElement("div");
                const div_text = document.createTextNode("username: " + users[x].username + "                 email: " + users[x].email);
                new_div.appendChild(div_text);

                var buttonE2 = document.createElement("button");
                var buttonTextE2 = document.createElement("a");
                buttonE2.className = "buttons";
                buttonTextE2.innerText = " Delete ";
                buttonE2.appendChild(buttonTextE2);
                new_div.appendChild(buttonE2);
                buttonE2.onclick = delete_users_from_arr();

                var buttonEl = document.createElement("button");
                var buttonTextEl = document.createElement("a");
                buttonEl.className = "buttons";
                buttonTextEl.innerText = " Edit ";
                buttonEl.appendChild(buttonTextEl);
                new_div.appendChild(buttonEl);


                new_div.classList = "user_infos";


                all_users.appendChild(new_div);
            }

        }
    }
}



function user_search() {
    let s = document.getElementById("search_bar_users").value;
    let result = s.trim();
    console.log(result);
    if (result === "") {
        generate_users_tabs(0);

    } else {
        generate_users_tabs(1);
    }



}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}