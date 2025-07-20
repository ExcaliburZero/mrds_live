async function downloadData() {
    return await d3.csv("data");
}

async function main() {
    const updateIntervalMilliseconds = 2000;

    while (true) {
        // Download the latest version of the data
        const data = await downloadData();
        console.log(data);

        const lastRow = data[data.length - 1];
        console.log(lastRow);

        // Clear out the existing tags so we don't duplicate them
        mainDiv.innerHTML = "";

        // Create the SVG that comprises the UI
        const width = 1920;
        const height = 1080;

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height);

        addBackground(svg, 0, 0, width, height);
        addStatBoxes(svg, 20, 850, lastRow);
        addConditionBoxes(svg, 850, 850, lastRow);

        // Apply the SVG
        mainDiv.append(svg.node());

        // Wait to update the UI so we don't hammer the system resources
        await new Promise(r => setTimeout(r, updateIntervalMilliseconds));
    }
}

function addBackground(svg, x, y, width, height) {
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#845221");

    addTopScreenBox(svg, x + 20, y + 20);
    addBottomScreenBox(svg, x + 1120, y + 20);
}

function addTopScreenBox(svg, x, y) {
    const width = 1060;
    const height = 800;

    addScreenBox(svg, x, y, width, height);
}

function addBottomScreenBox(svg, x, y) {
    const width = 766;
    const height = 580;

    addScreenBox(svg, x, y, width, height);
}

function addScreenBox(svg, x, y, width, height, lastRow) {
    let inset = 0;
    const rounded = 10;

    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#523118");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#e7b563");

    inset += 5;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#ce9452");

    inset += 5;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#efc673");
}

function addStatBoxes(svg, x, y, lastRow) {
    const xOffset = 400;
    const yOffset = 70;

    addStatBox(svg, x, y, "Power", "power", "#e75252", lastRow);
    addStatBox(svg, x, y + yOffset, "Intelligence", "intelligence", "#949cf7", lastRow);
    addStatBox(svg, x, y + yOffset * 2, "Skill", "skill", "#de73e7", lastRow);

    addStatBox(svg, x + xOffset, y, "Speed", "speed", "#ffef31", lastRow);
    addStatBox(svg, x + xOffset, y + yOffset, "Defense", "defense", "#ef9429", lastRow);
    addStatBox(svg, x + xOffset, y + yOffset * 2, "Life", "life", "#52d642", lastRow);
}

function addStatBox(svg, x, y, label, key, barColor, lastRow) {
    addStatBar(svg, x + 140, y + 5, key, barColor, lastRow);
    addStatLabel(svg, x, y, label);
}

function addStatLabel(svg, x, y, label) {
    const width = 150;
    const height = 60;

    let inset = 0;
    const rounded = 10;

    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#523118");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#e7b563");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#825020");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#ce9452");

    inset += 27;

    svg.append("text")
        .text(label)
        .attr("class", "statBarLabel")
        .attr("x", x + inset - 17)
        .attr("y", y + inset);
}

function addStatBar(svg, x, y, key, barColor, lastRow) {
    const width = 250;
    const height = 50;

    let inset = 0;
    const rounded = 10;

    console.log(lastRow);

    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#523118");

    inset += 1;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#e7b563");

    inset += 2;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#825020");

    inset += 2;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#efc673");

    const xScale = d3.scaleLinear()
        .domain([0, 999]).nice()
        .range([0, width - 15]);

    svg.selectAll("group1")
        .data([lastRow])
        .enter()
        .append("rect")
        .attr("x", x)
        .attr("y", y + inset + 5)
        .attr("width", d => xScale(d[key]))
        .attr("height", 30)
        .attr("fill", barColor);

    svg.selectAll("group5")
        .data([lastRow])
        .enter()
        .append("text")
        .attr("class", "statBarValue")
        .attr("x", x + 20)
        .attr("y", y + inset + 27)
        .text(d => d[key]);
}

function addConditionBoxes(svg, x, y, lastRow) {
    const yOffset = 70;

    addCondition(svg, x, y, "Stress", "stress", lastRow);
    addCondition(svg, x, y + yOffset, "Fatigue", "fatigue", lastRow);
    addCondition(svg, x, y + yOffset * 2, "Lifespan", "lifespan", lastRow);
}

function addCondition(svg, x, y, label, key, lastRow) {
    addConditionValue(svg, x + 105, y + 5, key, lastRow);
    addConditionLabel(svg, x, y, label);
}

function addConditionLabel(svg, x, y, label) {
    const width = 120;
    const height = 60;

    let inset = 0;
    const rounded = 10;

    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#523118");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#e7b563");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#825020");

    inset += 3;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#ce9452");

    inset += 27;

    svg.append("text")
        .text(label)
        .attr("class", "statBarLabel")
        .attr("x", x + inset - 17)
        .attr("y", y + inset);
}

function addConditionValue(svg, x, y, key, lastRow) {
    const width = 90;
    const height = 50;

    let inset = 0;
    const rounded = 10;

    console.log(lastRow);

    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#523118");

    inset += 1;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#e7b563");

    inset += 2;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#825020");

    inset += 2;

    svg.append("rect")
        .attr("x", x + inset)
        .attr("y", y + inset)
        .attr("width", width - inset * 2)
        .attr("height", height - inset * 2)
        .attr("rx", rounded)
        .attr("ry", rounded)
        .attr("fill", "#efc673");

    svg.selectAll("group5")
        .data([lastRow])
        .enter()
        .append("text")
        .attr("class", "statBarValue")
        .attr("x", x + 20 + 50)
        .attr("y", y + inset + 27)
        .attr("text-anchor", "end")
        .text(d => d[key]);
}


main();