const defaultSubs = [
{
name: "Mr. Grunc",
rating: 1,
stats: {
Strictness: "5/5 (No Talking)",
Workload: "4/5 (Have to stay on task)",
"Phone Policy": "Not Allowed 📵",
"Food Policy": "NO FOOD ❌"
},
reviews: [
{ text: "Was singling out kelan for some reason...", rating: 1 },
{ text: "Felt like an AP test", rating: 1 }
]
},
{
name: "Mr. Unc",
rating: 5,
stats: {
Strictness: "0/5 (Chiller than ice)",
Workload: "3/5 (Smash Bros)",
"Phone Policy": "Allowed, plus prometheon 📱",
"Food Policy": "Doesn't Care 🍔"
},
reviews: [
{ text: ""Im mister Unc, Im old"", rating: 5 },
{ text: "Steals our donuts", rating: 2 }
]
},
{
name: "Mr.Chen",
rating: 5,
stats: {
Strictness: "2/5 (Wants you to do your work)",
Workload: "2/5 (Dances sometimes)",
"Phone Policy": "Super chill about it 😇",
"Food Policy": "Clean up after yourself 😋"
},
reviews: [
{ text: "THE ABSOLUTE GOAT", rating: 5 },
{ text: "I LOVE MR CHEN", rating: 5 }
]
}
];

// Load from storage
let subs = JSON.parse(localStorage.getItem("subs")) || defaultSubs;

const subList = document.getElementById("subList");
const profile = document.getElementById("profile");

let selectedRating = 0;

document.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll(".star").forEach(star => {
star.addEventListener("click", () => {
selectedRating = parseInt(star.getAttribute("data-value"));
  document.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));

  for (let i = 0; i < selectedRating; i++) {
    document.querySelectorAll(".star")[i].classList.add("selected");
  }
});


});
});


function saveData() {
localStorage.setItem("subs", JSON.stringify(subs));
}

function renderSubs(list) {
subList.innerHTML = "";

list.forEach(sub => {
const div = document.createElement("div");
div.className = "card";
div.innerHTML = `<h3>${sub.name}</h3><p class="rating">⭐ ${sub.rating}</p>`;


div.onclick = () => openProfile(subs.indexOf(sub)); // 🔥 FIX

subList.appendChild(div);


});
}


function openProfile(index) {
const sub = subs[index];
subList.classList.add("hidden");
profile.classList.remove("hidden");

document.getElementById("subName").innerText = sub.name;
document.getElementById("subRating").innerText = "⭐ " + sub.rating;

const stats = document.getElementById("stats");
stats.innerHTML = "";
for (let key in sub.stats) {
const li = document.createElement("li");
li.innerText = key + ": " + sub.stats[key];
stats.appendChild(li);
}

renderReviews(sub);
window.currentSub = index;
}

function renderReviews(sub) {
const reviewDiv = document.getElementById("reviews");
reviewDiv.innerHTML = "";

sub.reviews.forEach(r => {
const p = document.createElement("p");
let stars = "";
for (let i = 0; i < r.rating; i++) {
  stars += "★";
}
p.innerText = stars + " - " + r.text;
reviewDiv.appendChild(p);
});
}

function addReview() {
const text = document.getElementById("reviewText").value;

if (!text || selectedRating === 0) {
alert("Add rating and review");
return;
}

subs[window.currentSub].reviews.push({
text: text,
rating: selectedRating
});

document.getElementById("reviewText").value = "";
selectedRating = 0;

document.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));

saveData();
renderReviews(subs[window.currentSub]);
}

function goBack() {
profile.classList.add("hidden");
subList.classList.remove("hidden");
document.getElementById("search").value = "";

renderSubs(subs);
}
document.getElementById("search").addEventListener("input", (e) => {
const value = e.target.value.toLowerCase();
const filtered = subs.filter(s => s.name.toLowerCase().includes(value));
renderSubs(filtered);renderSubs(filtered);
});

renderSubs(subs);
