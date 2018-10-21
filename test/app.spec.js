/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const topspots = require('./topspots.json');

const nightmareTimeout = 6500;

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';

describe('top spots', function () {
  this.timeout(nightmareTimeout);

  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('should show a list of topspots as bootstrap wells', () =>
    nightmare
    .goto(url)
    .wait('div.well')
    .evaluate(() => document.querySelectorAll('div.well').length)
    .end()
    .then((numberOfTodoComponents) => {
      expect(numberOfTodoComponents).to.equal(30);
    })
  ).timeout(nightmareTimeout);

  it('should show topspot name in each bootstrap well using a <h4> element.', () =>
    nightmare
    .goto(url)
    .wait('div.well')
    .evaluate(() => Array.prototype.slice.call(document.querySelectorAll('div.well>h4')).map(el => el.innerHTML))
    .end()
    .then((titles) => {
      expect(titles.length).to.equal(30);
      expect(titles.every((val, i) => expect(val).to.equal(topspots[i].name)));
    })
  ).timeout(nightmareTimeout);

  it('should show topspot description in each bootstrap well using a <p> element.', () =>
    nightmare
    .goto(url)
    .wait('div.well')
    .evaluate(() => Array.prototype.slice.call(document.querySelectorAll('div.well>p')).map(el => el.innerHTML))
    .end()
    .then((descriptions) => {
      expect(descriptions.length).to.equal(30);
      descriptions.forEach((val, i) => expect(val).to.equal(topspots[i].description));
    })
  ).timeout(nightmareTimeout);

  it('should show a link in each bootstrap well using an <a> element styled as a bootstrap button.', () =>
    nightmare
    .goto(url)
    .wait('div.well')
    .evaluate(() => Array.prototype.slice.call(document.querySelectorAll('div.well>a')).map(el => el.attributes.href.nodeValue))
    .end()
    .then((links) => {
      expect(links.length).to.equal(30);
      // check first, last, and one random item
      expect(links[0]).to.equal('https://maps.google.com/?q=33.09745,-116.99572');
      expect(links[15]).to.equal('https://maps.google.com/?q=32.767874,-117.166531');
      expect(links[29]).to.equal('https://maps.google.com/?q=32.743886,-117.160621');
    })
  ).timeout(nightmareTimeout);
});
