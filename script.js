
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
    import { getDatabase, ref, push ,onValue ,remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";


    const firebaseConfig = {
        apiKey: "AIzaSyCvOgoiaganFrVZm1TUIvA_CqkcWeAbjp4",
        authDomain: "addcartmain.firebaseapp.com",
        projectId: "addcartmain",
        storageBucket: "addcartmain.appspot.com",
        messagingSenderId: "597079513659",
        appId: "1:597079513659:web:f2cbd4c7cad055696f5a1e",
        measurementId: "G-2VSE51BL66"
      };


    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const database = getDatabase(app)
    const inputvalueel=document.getElementById("searchinput")
    const addbuttonel=document.getElementById("addtocart")
    const shoppingListInDB = ref(database, "shoppingList")
    const shoppingListEl = document.getElementById("shopping-list")


    addbuttonel.addEventListener("click",function(){
        let inputValue = inputvalueel.value;
        push(shoppingListInDB, inputValue)
        inputvalueel.value = ""




    })
    onValue(shoppingListInDB,function(snapshot){


        if (snapshot.exists())
        {
            let itemsArray = Object.entries(snapshot.val())

            clearshoppinglist()
            for(let i=0; i < itemsArray.length;i++){
                let currentitem = itemsArray[i]
            let currentitemID = currentitem[0]
            let  currentitemvalue = currentitem[1]
                appenditems(currentitem)
            }
        }
        else
        {
            shoppingListEl.innerHTML = "oops no items yet..."
        }
        

    })
    function clearshoppinglist(){
        shoppingListEl.innerHTML=""

    }

    function appenditems(item) {

        let itemID = item[0]
        let itemValue = item[1]
    //     shoppingListEl.innerHTML += `<li>${itemValue}</li>`
        let newel = document.createElement("li")
        newel.textContent = itemValue
        newel.addEventListener("click",function() {
            let exactlocation = ref(database,`shoppingList/${itemID}`)
            remove (exactlocation)
        })
        shoppingListEl.append(newel)

    }



