/**
 * @file Masonry view grid es6 class
 * @author Alec Povolotskiy <a.povolotskiy@gmail.com>
 */

export default class Masonry {
    /**
     * @param grid {string|object} - grid container
     * @param cols {object} - setup columns
     * @param res {object} - screen resolution setup
     */
    constructor(grid, cols, res) {
        this.grid = document.querySelector(grid);
        this.gridItems = Array.prototype.slice.call(this.grid.children);
        this.cols = cols;
        this.setResolution = res;
        window.onresize = this.updateLayout.bind(this);
        this.updateLayout();
    }

    /** update masonry view */
    update() {
        this.gridItems = Array.prototype.slice
            .call(this.grid.children)
            .filter(_onlyVisible.bind(this));
        this.updateLayout();
    }

    /**
     * set resolution property
     * @param res {object}  - resolutions object
     */
    set setResolution(res) {
        this.res = res;
    }

    /**
     * set columns grid
     * @param res
     */
    setGrid(res) {
        this.colSet = this.cols[res];
        this._colsHeight = [];
        this.gridItems.map(_setPosition.bind(this));
        this.grid.style.height = `${this._colsHeight.sort((a, b) => a - b).reverse()[0]}px`;
    }

    /** update column grid */
    updateLayout() {
        let screen = window.innerWidth;

        switch(true) {
            case(this.res.sm[0] < screen && screen < this.res.sm[1]):
                this.setGrid('sm');
                break;

            case(this.res.xs[0] < screen && screen < this.res.xs[1]):
                this.setGrid('xs');
                break;

            default:
                this.setGrid('md');
        }
    }
}

/**
 * set only visible elements
 * @param item {object} - html grid child item
 * @param i {string} - current index
 * @private
 */
function _onlyVisible(item, i) {
    return (item.style.display !== 'none');
}

/**
 * Set position for item
 * @param item {object} - html grid child item
 * @param i {string} - current index
 * @private
 */
function _setPosition(item, i) {
    if (this.colSet > 1) {
        let itemRow = _getRow.call(this, i),
            itemCol = _getCol.call(this, i);

        item.style.top = `${_getTop.call(this, i, itemRow)}px`;
        item.style.left = `${_getLeft(item.offsetWidth, itemCol)}px`;
        item.style.position = 'absolute';
    } else {
        this.grid.style.height = 'initial';
        item.style.position = 'initial';
    }
}

/**
 * Get item row
 * @param i {number} - item index
 * @returns {number} - item row
 * @private
 */
function _getRow(i) {
    return Math.ceil(++i / this.colSet);
}

/**
 * Get item col
 * @param i {number} - item index
 * @returns {number} - item column
 * @private
 */
function _getCol(i) {
    return i % this.colSet;
}

/**
 * Get item left position
 * @param w {number} -  item width
 * @param c {number} - item collumn
 * @returns {number} - position left
 * @private
 */
function _getLeft(w, c) {
    return w * c;
}

/**
 * Get item top position
 * @param i {object} - item index
 * @param c {number} - item collumn
 * @returns {number} - position top
 * @private
 */
function _getTop(i, c) {
    let elTop = 0,
        iPrev = i,
        col = c;

    while(col > 1) {
        iPrev -= this.colSet;
        elTop += this.gridItems[iPrev].offsetHeight;
        col--;
    }

    this._colsHeight.push(elTop + this.gridItems[i].offsetHeight);

    return elTop;
}