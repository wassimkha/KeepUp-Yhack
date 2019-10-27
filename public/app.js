// Required for side-effects

var array_questions = ["qst"];
document.addEventListener("DOMContentLoaded", event => {
  setVotes();

  const app = firebase.app();
  const db = firebase.firestore();
  const productsRef = db.collection('Questions');
  const query = productsRef.orderBy('importance', 'desc');
  query.onSnapshot(products => {
    products.forEach(doc => {
      data = doc.data();
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

        var diParent1 = document.createElement("DIV");


        var divone = document.getElementById("FirstOne");
        var div1 = document.createElement("DIV");
        div1.className = "input-group mb-3";
        //second div
        var div2 = document.createElement("DIV");
        div2.className = "input-group-prepend";
        //span 1
        var span1 = document.createElement("SPAN");
        span1.className = "input-group-text";
        var text = document.createTextNode("{Time}");
        //Text textarea
        var textArea = document.createElement("TEXTAREA");
        textArea.rows = 3;
        textArea.className = "form-control questions";
        textArea.setAttribute("type", "text");
        textArea.setAttribute("aria-label", "Default");
        textArea.setAttribute("aria-describedby", "inputGroup-sizing-default");
        textArea.readOnly = true;




        //other things
        //div3
        var div3 = document.createElement("DIV");
        div3.className = "input-group-append";

        //BUTTON
        var button = document.createElement("BUTTON");
        button.className = "btn btn-success upvoteBtn";
        button.type = "button";






        //span2
        var span2 = document.createElement("SPAN");
        span2.className = "row fa-stack fa-1x circle-padd";
        // span2.setAttribute("id", data.qst);
        // span2.setAttribute("onclick", "buttonPressed(event)");

        // //i
        // var i = document.createElement("I");
        // i.className = "fas fa-circle fa-stack-2x text-success";


        //a
        var a = document.createElement("A");


        //i2
        var i2 = document.createElement("I");
        i2.className = "fas fa-thumbs-up fa-stack-1x fa-inverse";
        i2.setAttribute("id", data.qst);
        i2.setAttribute("onclick", "buttonPressed(event)");




        //span
        var span3 = document.createElement("SPAN");
        span3.className = "input-group-text";



        //append
        divone.appendChild(div1);

        div1.appendChild(div2);
        div2.appendChild(span1);
        span1.appendChild(text);
        div1.appendChild(textArea);
        div1.appendChild(div3);

        div3.appendChild(button);
        button.appendChild(span2);
        // span2.appendChild(i);
        span2.appendChild(a);
        a.appendChild(i2);
        div3.appendChild(span3);
        span3.innerHTML = data.importance;
        textArea.innerHTML = data.qst;
        span1.innerHTML = "---->";
      }


      //document.querySelector('#qst_show').innerHTML = data.qst;
      //creating h1s
      //first div
      //first div1






      // var button = document.createElement('BUTTON');
      // var text = document.createTextNode("Upvote");
      // var t = document.createTextNode(data.qst);
      // h.appendChild(t);
      // document.body.appendChild(h);
      // button.appendChild(text);
      // button.id = data.qst;
      // h.appendChild(button);
      //document.write(`${data.qst} <br>`);

    })
  })
});






function writeUserData() {

  const db = firebase.firestore();
  var text = document.getElementById("ask-question").value;



  db.collection("Questions").doc(text).set({
    qst: text,
    importance: 0
  });

  document.getElementById("ask-question").value = "";



}

function buttonPressed(e) {
  var id = e.target.id;

  // var db = firebase.firestore();
  //
  // db.collection("Questions").doc(id).update({
  //   importance: this+1
  // });
  const db = firebase.firestore();
  const increment = firebase.firestore.FieldValue.increment(1);
  const storyRef = db.collection('Questions').doc(id);
  storyRef.update({ importance: increment });

}


//upvote
function upvote() {


  var db = firebase.firestore();

  // db.collection("Questions").doc(id).update({
  //   importance: this+1
  // });
  const increment = firebase.firestore.FieldValue.increment(1);
  const storyRef = db.collection('Comfort').doc("vote");
  storyRef.update({ yes: increment });






}



//downvote
function downvote() {


  // var db = firebase.firestore();
  //
  // db.collection("Questions").doc(id).update({
  //   importance: this+1
  // });
  const db = firebase.firestore();
  const increment = firebase.firestore.FieldValue.increment(1);
  const storyRef = db.collection('Comfort').doc("vote");

  storyRef.update({ no: increment });



}



function setVotes() {
  const db = firebase.firestore();
  var docRef = db.collection("Comfort").doc("vote");


  var percentage = 0;

docRef.get().then(function(doc) {
    if (doc.exists) {


      if ((doc.data().yes / (doc.data().yes + doc.data().no) * 100) != undefined) {
        document.getElementById("percentage1").innerHTML = Math.round(doc.data().yes / (doc.data().yes + doc.data().no) * 100) + "%";

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


// function voteF() {
//   const db = firebase.firestore();
//   // Create a reference to the cities collection
//   var vote = db.collection("Comfort");
//   var upvote = 0;
//   var downvote = 0;
//   vote.get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             upvote = doc.data().yes;
//             downvote = doc.data().no;
//
//         });
//         console.log(upvote);
//         console.log(downvote);
//
//         document.getElementById("aValue").innerHTML = upvote;
//         document.getElementById("bValue").innerHTML = downvote;
//
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//
// }
//
//
// function display() {
//   var a =   parseInt(document.getElementById("aValue").innerHTML);
//   var b =   parseInt(document.getElementById("bValue").innerHTML);
//   console.log(document.getElementById("aValue").innerHTML);
//
//
//         window.onload = function () {
//             CanvasJS.addColorSet("greenShades",
//                 [//colorSet Array
//
//                 "#ff4d4d",
//                 "#8ddf74"
//
//                 ]);
//             var chart = new CanvasJS.Chart("chartContainer", {
//                 title:{
//                     text: ""
//                 },
//                 colorSet: "greenShades",
//                 data: [
//                 {
//                     // Change type to "doughnut", "line", "splineArea", etc.
//                     type: "doughnut",
//                     dataPoints: [
//                         { label: "Falling Behind",  y: a  },
//                         { label: "Keeping Up", y: b  },
//                     ]
//                 }
//                 ]
//             });
//             chart.render();
//             function addOne() {
//               a++;
//             }
//         }
// }


// <div class="input-group mb-3">
//     <div class="input-group-prepend">
//         <span class="input-group-text">{time}</span>
//     </div>
//
//     <textarea rows="3" id="" type="text" class="form-control questions" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>test</textarea>
//
//     <div class="input-group-append">
//         <button class="btn btn-success upvoteBtn" type="button">
//             <span class="row fa-stack fa-1x circle-padd">
//                     <i class="fas fa-circle fa-stack-2x text-success"></i>
//                     <a href="#"><i class="fas fa-thumbs-up fa-stack-1x fa-inverse"></i></a>
//             </span>
//         </button>
//         <span class="input-group-text">{0}</span>
//     </div>
// </div>
