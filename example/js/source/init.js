/**
 * @file Masonry view grid init
 * @author Alec Povolotskiy <a.povolotskiy@gmail.com>
 */

import Masonry from './Masonry';

let col = {
    md: 3,
    sm: 2,
    xs: 1
};

let res = {
    md: [992, Infinity],
    sm: [769, 991],
    xs: [-Infinity, 768]
};

let masonryGrid = new Masonry('#masonry', col, res);