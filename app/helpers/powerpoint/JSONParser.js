/**
 * @param {[JSON]} workspace 
 * 
 * @returns {JSON[]} a list of shapes with text in .text and options in .options
 */
export function workspaceParser(workspace) {
    let elements = splitArrows(workspace.elements)
    let shapes = []
    let dx = 0
    let dy = 0
    let scale = 120

    for (const box of elements[0]) {
        let x = box.position.x / scale;
        let y = box.position.y / scale;
        if (x < dx) {
            dx = x
        }

        if (y < dy) {
            dy = y
        }
    }
    dx = dx*-1;
    dy = dy*-1;
    

    for (const box of elements[0]) {
        let json = {
            id: parseInt(box.id),
            text: box.data.displayName,
            options: {
                shape: "roundRect", line: { color: "000000", width: 1 }, fontSize: 10, h: .3, w: 1.5, align: "center",
                x: (box.position.x / scale) + dx,
                y: (box.position.y / scale) + dy
            }
        }
        shapes.push(json)
    }

    for(const arrow of elements[1]){
        // sort and place the mos top left one first
        /*
        figure out which side the arrow connects to an make correct start and stop x an y
        sort so that target and source are in the correct order for the box to be drawn (w and h cannot be negative)
        figure out which side the arrow has to be on
        */
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;
        let sourceindex = findboxindex(shapes, arrow.source)
        x = shapes[sourceindex].options.x +0.75;
        y = shapes[sourceindex].options.y +.3;
        let targetindex = findboxindex(shapes, arrow.target)
        
        w = shapes[targetindex].options.x - shapes[sourceindex].options.x
        h = shapes[targetindex].options.y - shapes[sourceindex].options.y


        let json = {
            id: parseInt(arrow.id),
            text: arrow.data.value,
            options:{
                shape: "curvedConnector3" /*"bentConnector3"*/ /*"line"*/, line:{ color: "000000", width: 1},
                x: x,
                y: y,
                h: h,
                w: w,

            }
        }
        shapes.push(json)
    }


    return shapes;

    //slides.at(-1).addText("Juristics A/S", { shape: pptx.shapes.ROUNDED_RECTANGLE, line: { color: "000000", width: 2 }, fontSize: 12, h: 1, w: 1 })

}

/**
 * this functions takes the target and source id's of an arrown + it's source handle and target handle
 * and uses them to find the xy coordinates of the source and target block and then make the xy coordinates for the arrow
 * @param {JSON} element this is the pure json element from the arrows list of elements given to us by the user
 * @param {JSON} shapes the list of already defined pptxgenjs boxes
 * 
 * @returns {JSON} an object with a target and a source which both have an x an y fx. ``` coordinateFinder().target.x ```
 */
function coordinateFinder(element, shapes){
    let sourceindex = findboxindex(shapes, arrow.source)
    let sourcex = shapes[sourceindex].options.x +0.75;
    let sourcey = shapes[sourceindex].options.y +.3;

}

/**
 * finds and returns the index of a box with a given id
 * test if this works
 * @param {JSON[]} boxlist 
 * @param {bigint} id
 * 
 * @returns {bigint}
 */
function findboxindex(boxlist, id) {
    let i = 0;
    for (const box of boxlist) {
        if (box.id == id) {
            return i;
        }
        i++;
    }
    throw new Error("Could not find id in list")
}

/**
 * Splits the arrows from the textboxes
 * @param {JSON} workspace 
 * 
 * @returns {[JSON[],JSON[]]} the first entries are the textboxes the second is the arrows
 */
function splitArrows(workspace) {
    let textbox = [];
    let arrows = [];
    for (const element of workspace) {
        if (element.target) {
            arrows.push(element)
        }
        else {
            textbox.push(element)
        }

    }
    return [textbox, arrows]
}