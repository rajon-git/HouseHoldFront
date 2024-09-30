fetch("footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer_nav").innerHTML = data;
}
)