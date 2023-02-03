// mobile check
let mobilmi = false;
(function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test
        (a.substr(0, 4)))
        mobilmi = true;
})
    (navigator.userAgent || navigator.vendor || window.opera);


// setup
var c = document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);
var ctx = c.getContext("2d");

var pts = [];
while (pts.length < 254) {
    while (pts.includes(val = Math.floor(Math.random() * 255)));
    pts.push(val);
}
pts.push(pts[0]);

var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;

var noise = x => {
    x = x * 0.01 % 254;
    return lerp(pts[Math.floor(x)], pts[Math.ceil(x)], x - Math.floor(x));
}

// init
var bgcolor = "#ff4301"; // turuncu
var forecolor = "#4a3f35"; // acik gri
var linecolor = "#2f2519"; // koyu gri
var linewidth = 5;
var offset = -10;
var yRatio = .3;
var t = 0;
var speed = 0;
var playing = true;
var k = { ArrowUp: 0, ArrowLeft: 0, ArrowRight: 0 }

// player
var player = new function () {
    this.x = c.width / 2;
    this.y = 50;
    this.truck = new Image();
    this.truck.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAA3NCSVQICAjb4U/gAAAC/VBMVEUAAABUhJIjQUvEgienxcsVJiyZmZl6p7IxXnAKFxvt5ClXQCOIgy5Ca3vf7vFTam+Ut74HDhArT1xSUlIZMTqZmTN7e3txn6tucXLP3uJ3ZxZJRAz074keHQaOiS+ErLUzMzPwnCcBBwlmmZnklCTVzjb//9k5Znk2U1+VsLUKGiDFxcXW1tZRbnRZVSkhQ1BBKwpAOwmMj5G7uLh7goXXjCatdCf37jnMzMwaNUAgHCE+Sk2EtL21tbWkniU4XGs5Ojrj4N98q7WTZSe8tjMxWGYREASGiotCcoNPTUzr9vgbGgeFh4mGVRMZGiExSVJTdYIwQURCQkJwlZ1VV1ifaycBDBIpLzG20NY6Y3NbiJWEhITe3t5mZmaZmZnn3zdKZWopKSknIiF7pa50e34OCQgRDh0jJyiMjIytra0qOUFrjpUfGxrl5MBwRg75oSkpS1nPiCc7ansSHyJAW2JLeop7VydplqPv7+89LyL/9y2OkpMICAgzUVvv5jhLOCJZdoJihIwZISMQEBB6eVMgOUOPtLyRixnEvTTf2Df1/v9mZmZbdHkZGRkxQklBPj02IwlwbS5lSifd6Ougv8UqKCAeIyoGERi80tYoSFP39/dIcH0RKDGrpjL1niYpMjlmmZnMzDNIUlQxTFc/boKpoyciMDVDNiaIXyf/zDPX0V1jjpoRISgyWmpznKRmYyoQGBkfKTEhPUmuyc7P5On++rEAAQ1kRyM0SEyEsLo8YW64eydAPDxahJFIXGBKSkpbOQw8boIqQkt1o63n5uYaISqJpKovU2Jzc3MzKSJBPSIzYnP38ppLa3heYGHwsywpUmJ9eCz49atScHwXKjIFCw7ekSY5TFBufIIOGyBHQiVSfYuKucOlpaX///+/19wpODruuy9jjJR8f4AnJjEcEQNaWlr/+DpcfYTm7vAqGwZXVVWWcRpsmqZXQifllSa9vb2MYyE4OUBZeH5LSCjw8f8hISEoPEevrykzZmZDVFzS4ONKdYRmmZnv+fxt5JOxAAAA/3RSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A//////////////////////////////////////////+/yRTcAAAACXBIWXMAAA6cAAAOnAEHlFPdAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAIABJREFUeJzdnX90VFWe4L+iVJLpxSY/LOJu91bxTrvFmmqZKRRCmTSVdMcQOx2aArsMSZ2hKl2mgrVNLETi1kPbvImrHh9MK5BOoeRsw2LPkmQg7vQQRbOYsBSTNmsviZqGRIY4QdtFctbeZx+aw9l77/v93q2f0O6c+f5DqKp37/3c+73f+73f++PBzL8Qgf/fBbhZ8tWAxJvLLYliu08Uu3c4kShFkrBam8Ixy3Tb9LSz4waz+NOCxKvKK2OzG71BngMARhSgCSf4K28oqz8NSEfz/HTTnFfgcRlZPuDdaLW0OZurZGl2OsvLy1aglpi2IInFYk1eFgTLDWR5k0HiznlLYtjOEoCIvS4Rriyriitfv3D9wQc//fRlLLff/uD1F7SPNtfzYC/LOeebBtLhbAvP+UgT8PbPEpZK56gMcP32P3708G17Fj9rs+XljUjSgsVmsy3e8/rP7/yU/DQe5iCca/43A6SjLFZ6AncCzjeciJU5ZYAXPv3jR6/vWTwklz4vz4Yljwj+v83W0iJ+ZVt820cvz8xUDUOu6nWDIKNllo2tRJHsielyxfLEP73z57cttrXIAJggb2TJjiObbjl3bVFj/+n2BV0lg423XJaxCJjt9Zk47/nKQeLlbQk7ViRPqaXMC5Uywh9VBFJCxNAysGPTuWuHGk/3dE1MdU8qdmu1Y5NKguTybTN+aP6KQeYjqCSR4nAZaYY5mJ958OWPXtchEIqWHZu2r43mFy2YmJokJiBorytNhNtWrJiOQF/+LdXVGpK8mTKIfbUgcYHzW5TecP0X8D8WV+sQSFMMIAhHf/vqbZiBP+HHJkBNY7QOCmrO5WnaZOTlmVx1K1eQ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";
    this.rot = 0;
    this.ySpeed = 0;
    this.rSpeed = 0;

    // interface
    this.startBtn = new Image();
    this.startBtn.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABHElEQVR42u3azQmDQBCG4e0gPdhA8OBPMxbgKTcLsA0PHm3Au3aQElJCwAaMnzAh5JTAzugHs7AgOb0PrGQTJoRtJUlyybLsVhTFhJ3n+bMsy/VMG03Sh1Y0B4nfPnycLfgH0H1HbA89W/wHog9nPC7/HKvAGi/bAQ5wgAMccDygaZq167p9V1XFB1iWZZWFZ0tEFMD3skSoACwRagArhCpAEHjJaQGy2rblBmghTAEaCHNAbMQhAKy6rrkB8zxzA3BvogWM48j7DsSMNwfEjjcFaMSbAYZh4L0Lad2BTADa8aoAi3g1gFV8NAC+VeWHvWW8/y/kAAc4wAEO4AcwjhnIRjv/qAEGJhjHDdD8nlhJ0/SKMRaiozOhGe0vVc+SlbPlegkAAAAtdEVYdFNvZnR3YXJlAGJ5LmJsb29kZHkuY3J5cHRvLmltYWdlLlBORzI0RW5jb2RlcqgGf+4AAAAASUVORK5CYII=";
    this.leftBtn = new Image();

    this.rightBtn = new Image();
    this.rightBtn.src = "data:image/png;base64,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";
    this.fireBtn = new Image();

    this.fireBtn.src = "data:image/png;base64,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";

    this.drawInterface = function () {

        if (playing) {
            // interce draw
            if (mobilmi) {
                ctx.drawImage(this.leftBtn, 20, c.height - 90, 70, 70);
                ctx.drawImage(this.rightBtn, 110, c.height - 90, 70, 70);
                ctx.drawImage(this.fireBtn, c.width - 90, c.height - 90, 70, 70);
            }
        }
        else {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "32px Impact";
            ctx.fillStyle = "white";
            ctx.fillText("OYUN BİTTİ", c.width / 2, c.height / 3);
            ctx.drawImage(this.startBtn, (c.width / 2) - 25, (c.height / 3) + 50, 50, 50);
        }
    }


    this.draw = function () {
        var p1 = (c.height * .9) - noise(this.x + t) * yRatio;
        var p2 = (c.height * .9) - noise(this.x + t + 5) * yRatio;
        // gnd check
        var gnd = 0;
        var offset = 38;
        if (p1 - offset > this.y) {
            this.ySpeed += 0.1;
        }
        else {
            this.ySpeed -= this.y - (p1 - offset);
            this.y = p1 - offset;
            gnd = 1;
        }

        // fall check
        if (!playing || gnd && Math.abs(this.rot) > Math.PI * 0.5) {
            playing = false;
            this.rSpeed = 5;
            k.ArrowUp = 1;
            this.x -= speed * 5;
        }
        // rotation calc
        var angle = Math.atan2(
            (p2 - offset) - this.y,
            (this.x + 5) - this.x);
        if (gnd && playing) {
            this.rot -= (this.rot - angle) * 0.5;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }

        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
        this.rot -= this.rSpeed * 0.05;


        this.rot -= this.rSpeed * 0.1;
        if (this.rot > Math.PI) this.rot = -Math.PI;
        if (this.rot < -Math.PI) this.rot = Math.PI;

        this.y += this.ySpeed;
        // drawing
        // truck draw
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.drawImage(this.truck, -40, -40, 80, 80);
        ctx.restore();
    }
}

// draw
function draw() {
    speed -= (speed - (k.ArrowUp)) * 0.01;
    t += 10 * speed;
    // bg
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, c.width, c.height);
    // player
    player.draw();
    // ground
    ctx.fillStyle = forecolor;
    ctx.strokeStyle = linecolor;
    ctx.lineWidth = linewidth;
    ctx.beginPath();
    ctx.moveTo(offset, c.height - offset);
    for (let i = offset; i < c.width - offset; ++i) {
        ctx.lineTo(i, (c.height * .9) - noise(i + t) * yRatio);
    }
    ctx.lineTo(c.width - offset, c.height - offset);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    player.drawInterface();


    // animation
    requestAnimationFrame(draw);
}
draw();


// mobile controls
if (mobilmi) {
    c.addEventListener("touchstart", handleStart, false);
    c.addEventListener("touchend", handleEnd, false);

    function handleStart(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            var touch = touches[i];
            checkBtnPress(touch.pageX, touch.pageY);
        }
    }

    function handleEnd(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            var touch = touches[i];
            checkBtnRelase(touch.pageX, touch.pageY);
        }
    }
} else {
    // desktop controls

    onkeydown = d => k[d.key] = 1;
    onkeyup = d => k[d.key] = 0;

    c.addEventListener("click", handleClick, false);
    function handleClick(evt) {
        checkBtnPress(evt.clientX, evt.clientY);
    }

}

window.onresize = function () { }


function checkBtnPress(x, y) {
    if (!playing && x >
        ((c.width / 2) - 25) && x <
        ((c.width / 2) + 25) && y >
        ((c.height / 3) + 50) && y <
        ((c.height / 3) + 100)) {
        //window.location.reload();
        // codepen icin
        //history.go(0);
        alert("Sayfayı Yenile !");
    }
    if (playing && x > 20 && x < 90 && y >
        (c.height - 90) && y < (c.height - 20)
    ) {
        k.ArrowLeft = 1;
    }

    if (playing && x > 110 && x < 180 && y >
        (c.height - 90) && y < (c.height - 20)
    ) {
        k.ArrowRight = 1;
    }

    if (playing && x >
        (c.width - 90) && x <
        (c.width - 20) && y >
        (c.height - 90) && y <
        (c.height - 20)
    ) {
        k.ArrowUp = 1;
    }
}

function checkBtnRelase(x, y) {
    if (!playing && x >
        ((c.width / 2) - 25) && x <
        ((c.width / 2) + 25) && y >
        ((c.height / 3) + 50) && y <
        ((c.height / 3) + 100)) {
        //window.location.reload();
        // codepen icin
        history.go(0);
    }
    if (playing && x > 20 && x < 90 && y >
        (c.height - 90) && y < (c.height - 20)
    ) {
        k.ArrowLeft = 0;
    }
    if (playing && x > 110 && x < 180 && y >
        (c.height - 90) && y < (c.height - 20)
    ) {
        k.ArrowRight = 0;
    }
    if (playing && x > (c.width - 90) &&
        x < (c.width - 20) && y > (c.height - 90) &&
        y < (c.height - 20)
    ) {
        k.ArrowUp = 0;
    }
}
