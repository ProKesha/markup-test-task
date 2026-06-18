const posts = [
  { image: "./photo/Rectangle 12.svg", tileImage: "./photo/tiles-1.svg", alt: "Forest valley post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 13.svg", tileImage: "./photo/tiles-2.svg", alt: "Mountain road post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 14.svg", tileImage: "./photo/tiles-3.svg", alt: "Portrait post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 15.svg", tileImage: "./photo/tiles-1.svg", alt: "Street view post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 16.svg", tileImage: "./photo/tiles-4.svg", alt: "Landscape post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 17.png", tileImage: "./photo/tiles-5.svg", alt: "Ceramic still life post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 18.svg", tileImage: "./photo/tiles-6.svg", alt: "Architecture post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 19.svg", tileImage: "./photo/tiles-7.svg", alt: "Outdoor post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 20.svg", alt: "City post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 12.svg", tileImage: "./photo/tiles-1.svg", alt: "Forest valley post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 13.svg", tileImage: "./photo/tiles-2.svg", alt: "Mountain road post", title: "Today", date: "9-08-2016" },
  { image: "./photo/Rectangle 14.svg", tileImage: "./photo/tiles-3.svg", alt: "Portrait post", title: "Today", date: "9-08-2016" }
];

const postsEl = document.querySelector("#posts");
const loadMore = document.querySelector("#load-more");
const screenLabel = document.querySelector(".screen-label");
const tilesCount = 8;
let visibleCount = 9;
let currentView = "list";

function makePost({ image, tileImage, alt, title, date }, index) {
  const displayImage = currentView === "grid" && tileImage ? tileImage : image;
  const post = document.createElement("article");
  post.className = "post";
  post.innerHTML = `
    <img class="post-image" src="${displayImage}" alt="${alt}" loading="lazy">
    <div class="post-body">
      <div class="post-row">
        <div class="metric-group">
          <div class="metric-title"><span>${title}</span></div>
          <div class="metric-line"><span class="heart" aria-hidden="true"></span><span>128</span></div>
          <div class="metric-line"><span class="comment" aria-hidden="true"></span><span>31</span></div>
        </div>
        <div class="metric-group">
          <div class="metric-title"><span>${date}</span></div>
          <div class="metric-line"><span class="heart" aria-hidden="true"></span><span>67</span></div>
          <div class="metric-line"><span class="comment" aria-hidden="true"></span><span>22</span></div>
        </div>
      </div>
      <div class="upload"><span>Image upload</span><span>11-04-2016</span></div>
    </div>
  `;
  return post;
}

function renderPosts() {
  const visiblePosts = currentView === "grid" ? posts.slice(0, tilesCount) : posts.slice(0, visibleCount);
  postsEl.replaceChildren(...visiblePosts.map(makePost));
  loadMore.hidden = currentView === "grid" || visibleCount >= posts.length;
}

document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.view);
  });
});

function setView(view) {
  const nextView = view === "list" ? "list" : "grid";
  currentView = nextView;
  document.querySelectorAll(".view-button").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === nextView);
  });
  postsEl.className = nextView === "list" ? "posts-list" : "posts-grid";
  screenLabel.textContent = nextView === "grid" ? "Tiles" : "Rows";
  renderPosts();
}

loadMore.addEventListener("click", () => {
  visibleCount = Math.min(visibleCount + 4, posts.length);
  renderPosts();
});

document.querySelectorAll("[data-clear]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.clear);
    input.value = "";
    input.focus();
  });
});

if (window.flatpickr) {
  flatpickr("#date-from", {
    dateFormat: "d_m_Y",
    defaultDate: null,
    allowInput: true,
    monthSelectorType: "static"
  });

  const dateToPicker = flatpickr("#date-to", {
    dateFormat: "d_m_Y",
    defaultDate: "09_12_2016",
    allowInput: true,
    monthSelectorType: "static",
    onReady: (_, __, instance) => {
      instance.input.value = "09_08_2016";
      if (window.innerWidth > 760) {
        window.setTimeout(() => instance.open(), 0);
      }
    }
  });

  window.addEventListener("load", () => {
    dateToPicker.input.value = "09_08_2016";
    if (window.innerWidth > 760) {
      dateToPicker.open();
    }
  });
}

renderPosts();
setView(new URLSearchParams(window.location.search).get("view") || "list");
