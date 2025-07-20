async function downloadData() {
    try {
        return await d3.csv("data");
    } catch (error) {
        // If data download fails, then we want to clear the display and wait the normal time
        // period to retry. We want the streamer to quickly notice that the server is down.
        return undefined;
    }
}

function preprocessData(data) {
    if (typeof data === "undefined") {
        return [];
    }

    const startingWeek = d3.min(data, d => d.week_full);
    for (let entry of data) {
        entry.week_full = entry.week_full - startingWeek;
    }

    return data;
}

async function main() {
    const updateIntervalMilliseconds = 2000;

    while (true) {
        // Download the latest version of the data
        const data = preprocessData(await downloadData());
        const lastRow = data[data.length - 1];

        // Clear out the existing tags so we don't duplicate them
        mainDiv.innerHTML = "";

        // Create the SVG that comprises the UI
        const width = 1920;
        const height = 1080;

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height);

        addBackground(svg, 0, 0, width, height);
        addStatBoxes(svg, 270, 850, lastRow);
        addConditionBoxes(svg, 40, 850, lastRow);
        addPlot(svg, 1100, 620, 800, 440, data);

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

    if (typeof lastRow !== "undefined") {
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

    if (typeof lastRow !== "undefined") {
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
}

function addPlot(svg, x, y, width, height, data) {
    addScreenBox(svg, x, y, width, height);

    const xOffset = 45;
    const yRevOffset = 20;

    const xInset = 30;
    const yInset = 50;

    const plotWidth = width - xInset * 2;
    const plotHeight = height - yInset * 2;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.week_full))
        .range([x + xInset + xOffset, x + xInset + plotWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, 1000])
        .range([y + plotHeight + yInset, y + yInset - yRevOffset]);

    svg.append("g")
        .attr("transform", "translate(0," + (y + height - yInset) + ")")
        .call(d3.axisBottom(xScale))
        .style("font-size", "20px");

    svg.append("g")
        .attr("transform", "translate(" + (x + xInset + xOffset) + ",0)")
        .call(d3.axisLeft(yScale))
        .style("font-size", "20px");

    const cases = [
        ["life", "#52d642"],
        ["defense", "#ef9429"],
        ["speed", "#ffef31"],
        ["skill", "#de73e7"],
        ["intelligence", "#949cf7"],
        ["power", "#e75252"],
    ];

    for (const entry of cases) {
        const field = entry[0];
        const color = entry[1];

        svg.append("path")
            .datum(data)
            .attr("cx", d => xScale(d.week_full))
            .attr("cy", d => yScale(d[field]))
            .attr("r", 2.0)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 4.0)
            .attr("d", d3.line()
                .x(d => xScale(d.week_full))
                .y(d => yScale(d[field]))
            );
    }
}


main();