const subs = [
{
name: "Mr. Johnson",
rating: 4.2,
stats: {
strictness: "2/5 (Chill)",
workload: "1/5 (Nothing)",
phone: "Allowed",
food: "Doesn't Care"
},
reviews: [
"Let people eat, super chill",
"Didn't say much but easy class"
]
},
{
name: "Ms. Carter",
rating: 2.1,
stats: {
strictness: "5/5 (Very Strict)",
workload: "4/5",
phone: "Not Allowed",
food: "No Food"
},
reviews: [
"Took phones away instantly",
"Felt like a test day"
]
}
];

const subList = document.getElementById("subList");
const profile = document.getElementById("profile");

function renderSubs(list) {
subList.innerHTML = "";
list.forEach((sub, index) => {
const div = document.createElement("div");
div.className = "card";
div.innerHTML = `<h3>${sub.name}</h3><p class="rating">⭐ ${sub.rating}</p>`;
div.onclick = () => openProfile(index);
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
p.innerText = "⭐ " + r;
reviewDiv.appendChild(p);
});
}

function addReview() {
const text = document.getElementById("reviewText").value;
if (!text) return;

subs[window.currentSub].reviews.push(text);
document.getElementById("reviewText").value = "";
renderReviews(subs[window.currentSub]);
}

function goBack() {
profile.classList.add("hidden");
subList.classList.remove("hidden");
}

document.getElementById("search").addEventListener("input", (e) => {
const value = e.target.value.toLowerCase();
const filtered = subs.filter(s => s.name.toLowerCase().includes(value));
renderSubs(filtered);
});

renderSubs(subs);

