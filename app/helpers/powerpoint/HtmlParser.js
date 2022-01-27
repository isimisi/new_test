import { DomHandler, DomUtils, Parser } from "htmlparser2"


/**
 * @param {String} HTML is the html you want to parse into pptxgenjs format
 * 
 * @returns {[JSON[]]} the list of htmltags parsed into pptxgenjs text format
 */
export function ParseHTML(HTML) {
    const handler = new DomHandler((error, dom) => { });
    const parser = new Parser(handler);
    parser.write(HTML.split(" ").filter(word => word != "").join(" ").replace(/(?:\r\n|\r|\n)/g, ""));
    parser.end();
    const pptxText = [];
    const texttags = DomUtils.find((node) => {
        if (node.type == "text") {
            return true;
        }
        return false;
    }, handler.dom, true);

    for (const text of texttags) {
        let branch = branchMaker(text)

        // then we loop through every node in the branch and add its options to the options tag
        //so that the latests parents attributes overrides the oldest
        let textdata = text.data.trim();

        pptxText.push({
            text: textdata,
            options: optionsParser(branch)
        })


    }

    return slidesplitter(pptxText);

}

/**
 * this fucntions creates the whole branch from root to the selected node
 * @param {Node} textnode the tag that you want to create a branch for
 * @returns {Node[]} the branch of parents to the node
 */

function branchMaker(textnode) {
    // we start by findin every element of the branch
    let branch = [textnode]
    let branching = true
    while (branching) {
        if (branch.at(-1).parent.type != "root") {
            branch.push(branch.at(-1).parent);
        }
        else {
            branching = false;
        }

    }
    // then we flip it, as we have been searching for their parents eg. the list is backwards
    branch = branch.reverse();
    return branch
}



/**
 * @param {JSON[]} branch list of parents to a text node
 * 
 * @returns {JSON} the pptx json format with all the attributes of the parents
 */

function optionsParser(branch) {

    let options = {};

    for (const node of branch) {
        if (node.name == "strong") {
            options.bold = true
        }
        if (node.parent.name == "p" && DomUtils.getSiblings(node).at(-1) == node) {
            options.breakLine = true
        }
        if (node.name == "a") {
            options["hyperlink"] = {
                url: node.attribs.href
            }
        }
        if (node.name == "li") {
            options.bullet = true
            options.breakLine = true
        }
        if (node.attribs) {
            if (node.attribs.style) {
                let style = cssparser(node.attribs.style);
                if (style["background-color"]) {
                    options.highlight = RGBtoHEX(style["background-color"])
                }
                if (style.color) {
                    options.color = RGBtoHEX(style.color)
                }
            }
        }
    }

    return options
}
/**
 * Parses color data from css style to json with hex color
 * @param {String} css 
 * 
 * @returns {JSON}
 */
function cssparser(css) {
    let elements = css.split(";")
    let json = {}
    for (const element of elements) {
        if (element != "") {
            let nameData = element.split(":")
            json[nameData[0].trim()] = nameData[1].trim();
        }
    }
    return json
}

/**
 * 
 * @param {String} rgb  the rgb option to convert into hex fx. ``` rgb(255, 255, 255) ```
 * 
 * @returns {String} returns a string like "ffffff"
 */
function RGBtoHEX(rgb) {
    let values = rgb.replace("rgb(", "").replace(")", "").split(",");
    for (const i in values) {
        values[i] = parseInt(values[i])

        if (values[i] > 255) {
            values[i] = 255
        }
        if (values[i] < 0) {
            values[i] = 0
        }

        if (values[i].toString(16).length == 1) {
            values[i] = "0" + values[i].toString(16);
        } else {
            values[i] = values[i].toString(16);
        }
    }

    return values[0].toString(16) + values[1].toString(16) + values[2].toString(16)

}

/**
 * takes parsed text and splits it into multiple slides if it overflows the page
 * @param {JSON[]} parsedText parsed text to be split into slides
 * 
 * @returns {[JSON[]]}
 */

function slidesplitter(parsedText) {
    let charachters = 0;
    let lines = 0;
    let slides = [[]];
    for (const text of parsedText) {
        if (text.text.includes("\n")) {
            text.text.replace("\n", function (x) {
                lines++;
            });
            charachters += text.text.split("\n").at(-1).length
            if (charachters >= 85) {
                lines += parseInt(charachters / 85);
                charachters = charachters - parseInt(charachters / 85) * 85;
            }
        } else {
            charachters += text.text.length;
            if (charachters >= 85) {
                lines += parseInt(charachters / 85);
                charachters = charachters - parseInt(charachters / 85) * 85;
            }
        }
        if (text.options.breakLine) {
            lines++;
        }
        if (text.options.bullet) {
            lines++;
        }

        if (lines > 25) {
            lines = 0;
            slides.push([]);

        }
        slides.at(-1).push(text);

    }

    return slides;

}
