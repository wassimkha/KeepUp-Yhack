
var array_questions = ["qst"];
document.addEventListener("DOMContentLoaded", event => {
  setVotes();
  const app = firebase.app();
  const db = firebase.firestore();
  const productsRef = db.collection('Questions');
  const query = productsRef.orderBy('importance', 'desc').limit(3);
  query.onSnapshot(products => {
    products.forEach(doc => {
      data = doc.data();
      //document.querySelector('#qst_show').innerHTML = data.qst;
      //creating h1s
      //first div
      //first div1

      const currentStr = data.qst;
      var x = false;

      for (i=0; i < array_questions.length; i++) {
        if (array_questions[i] == currentStr) {
          x = true;
          break;
        };
      };


      if (x == true) {

      } else {
        array_questions.push(currentStr);


        var divParentP = document.getElementById("FirstOne");

        var divParent = document.createElement("DIV");
        divParent.className = "input-group mb-3"


        // Prepend
        var div2 = document.createElement("DIV");
        div2.className = "input-group-prepend";
        divParentP.appendChild(divParent);
        divParent.appendChild(div2);

        var span1 = document.createElement("SPAN");
        span1.className = "input-group-text";

        div2.appendChild(span1);

        // TextArea
        var textArea = document.createElement("TEXTAREA");
        textArea.rows = 3;
        textArea.className = "form-control questions questions-teacher";
        textArea.setAttribute("type", "text");
        textArea.setAttribute("aria-label", "Default");
        textArea.setAttribute("aria-describedby", "inputGroup-sizing-default");
        textArea.readOnly = true;
        divParent.appendChild(textArea);

        // Append
        var div3 = document.createElement("DIV");
        div3.className = "input-group-append";

        divParent.appendChild(div3);

        var span2 = document.createElement("SPAN");
        span2.className = "input-group-text";

        div3.appendChild(span2);

        span2.innerHTML = data.importance;
        textArea.innerHTML = data.qst;
        span1.innerHTML = "---->";




      }






      // var divone = document.getElementById("FirstOne");
      //
      // //first div
      // var diParent1 = document.createElement("DIV");
      // diParent1.className = "input-group-prepend";
      //
      // //span 1
      // var span1 = document.createElement("SPAN");
      // span1.className = "input-group-text";
      //
      //
      // //Text textarea
      // var textArea = document.createElement("TEXTAREA");
      // textArea.rows = 3;
      // textArea.className = "form-control questions questions-teacher";
      // textArea.setAttribute("type", "text");
      // textArea.setAttribute("aria-label", "Default");
      // textArea.setAttribute("aria-describedby", "inputGroup-sizing-default");
      // textArea.readOnly = true;
      //



      //append
      // divone.appendChild(diParent1);
      //
      // diParent1.appendChild(span1);
      // divone.appendChild(div1);
      // div1.appendChild(text);
      // div1.appendChild(textArea);
      // div1.appendChild(div3);



      // div3.appendChild(span3);

      // span3.innerHTML = data.importance;
      // textArea.innerHTML = data.qst;
      // span1.innerHTML = "4:00";
      // <div class="input-group mb-3" id="FirstOne">
      //     <div class="input-group-prepend">
      //         <span class="input-group-text">{time}</span>
      //     </div>
      //
      //     <textarea rows="3" id="" type="text" class="form-control questions questions-teacher" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>test</textarea>
      //
      //     <div class="input-group-append">
      //         <span class="input-group-text">Upvotes: {0}</span>
      //     </div>
      // </div>






    })



  })




});


function setVotes() {
  const db = firebase.firestore();
  var docRef = db.collection("Comfort").doc("vote");


  var percentage = 0;

docRef.get().then(function(doc) {
    if (doc.exists) {


      if ((doc.data().yes / (doc.data().yes + doc.data().no) * 100) != undefined) {
        document.getElementById("percentage2").innerHTML = Math.round(doc.data().yes / (doc.data().yes + doc.data().no) * 100) + "%";
        console.log(Math.round(doc.data().yes / (doc.data().yes + doc.data().no) * 100) + "%");
      }

    // var percentage = parseInt(document.getElementById("understand").innerHTML) / (parseInt(document.getElementById("understand").innerHTML) + parseInt(document.getElementById("DoNotunderstand").innerHTML));
    //   console.log(percentage);
    // document.getElementById("percentage1").innerHTML = percentage;

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


// document.getElementById("percentage1").value = percentage;
}
