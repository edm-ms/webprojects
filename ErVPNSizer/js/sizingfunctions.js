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
    timeHours = timeHours.toFixed(1);
    var utilization = document.getElementById("utilization").value;
    var overhead = 1.1;

    document.getElementById("gbRequested").innerHTML = data;
    document.getElementById("timeInHours").innerHTML = timeHours;
    document.getElementById("howBusy").innerHTML = utilization;

    utilization = parseFloat(utilization) / 100;
    utilization = parseFloat(utilization);

    var Mbps = overhead * (data * 1000 * 8) / (time * 60);
    Mbps = Math.ceil(Mbps, 1);
    var LinkSize = (Mbps / utilization);
    LinkSize = Math.ceil(LinkSize, 1);

    document.getElementById("Mbps").innerHTML = Mbps;
    document.getElementById("LinkSize").innerHTML = LinkSize;

    closest(erChoices, LinkSize, Mbps);
}

function closest(erChoices, LinkSize, Mbps) {
    var i = 0;
    var m = 0;
    var vpnScaleMax = 40;
    var erSizeEst;
    var vpnSizeEst;
    var vpnMatch;

    for (i in erChoices) {
        m = LinkSize - erChoices[i];
        if (m <= 0) {
            erSizeEst = erNames[i];
            erMatch = erChoices[i];
            m = 0;
            break;
        }
    }

    for (i = 0; i < vpnScaleMax; i++) {
        m = LinkSize - (i * 500);
        if (m <= 0) {
            vpnSizeEst = i + " Virtual Wan Scale Units";
            vpnMatch = i;
            m = 0;
            break;
        }
    }

    var erBusy = (Mbps / erMatch) * 100;
    erBusy = erBusy.toFixed(0);
    var vpnBusy = (Mbps / (vpnMatch * 500)) * 100;
    vpnBusy = vpnBusy.toFixed(0);
    document.getElementById("erBusy").innerHTML = erBusy;
    document.getElementById("vpnBusy").innerHTML = vpnBusy;
    document.getElementById("erSizeEst").innerHTML = erSizeEst;
    document.getElementById("vpnSizeEst").innerHTML = vpnSizeEst;
    openNav();
}