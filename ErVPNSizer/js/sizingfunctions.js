var erChoices = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 40000, 100000];
var erNames = ["50 Mbps", "100 Mbps", "200 Mbps", "500 Mbps", "1 Gbps", "2 Gbps", "5 Gbps", "10 Gbps", "40 Gbps", "100 Gbps"];

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function convertGB() {
    var data = document.getElementById("sizeInGB").value;
    var time = document.getElementById("timeInMin").value;
    var timeHours = time / 60;
    timeHours = timeHours.toFixed(1)
    var utilization = document.getElementById("utilization").value;
    var overhead = 1.1;

    document.getElementById("gbRequested").innerHTML = data;
    document.getElementById("timeInHours").innerHTML = timeHours;
    document.getElementById("howBusy").innerHTML = utilization;

    utilization = parseFloat(utilization) / 100;
    utilization = parseFloat(utilization);

    var Mbps = overhead * (data * 1000 * 8) / (time * 60);
    var linkSize = (Mbps / utilization);
    Mbps = Math.ceil(Mbps, 1)
    linkSize = Math.ceil(linkSize, 1)

    document.getElementById("Mbps").innerHTML = Mbps;
    document.getElementById("linkSize").innerHTML = linkSize;

    closest(erChoices, linkSize, Mbps);
}

function closest(erChoices, linkSize, Mbps) {
    var i = 0;
    var m = 0;
    var minDiff = 100;
    var ans;

    for (i in erChoices) {
        m = linkSize - erChoices[i];
        if (m <= 0) {
            ans = erNames[i];
            erMatch = erChoices[i];
            break;
        }
    }
    var erBusy = (Mbps / erMatch) * 100;
    erBusy = erBusy.toFixed(0);
    document.getElementById("erBusy").innerHTML = erBusy;
    document.getElementById("ans").innerHTML = ans;
    openNav();
}