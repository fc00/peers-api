var Fs = require("fs");
var Marked = require("marked");
var Path = require("path");

var markdownPath = './md';
var outputPath = './www'

var markdownFiles = Fs.readdirSync(Path.resolve(markdownPath)).filter(function (name) {
    return /\.md$/.test(name);
});



var template = Fs.readFileSync('./assets/template.html', 'utf-8');

var swap = function (s, d) {
    return s.replace(/\{\{(.*)\}\}/g, function (a, k) {
        return d[k] || a;
    });
};

markdownFiles.forEach(function (name) {
    console.log("Compiling html for %s", name);

    var content = Fs.readFileSync(Path.resolve(markdownPath, name), 'utf-8');

    var built = swap(template, {
        content: Marked(content),
        title: 'Peers.fc00::' + name.replace(/\.md$/, '').replace(/index/, 'home')
    });

    var target = Path.resolve(outputPath, name.replace(/\.md$/, '.html'));
    console.log("Writing output to %s", target);

    Fs.writeFileSync(target, built);
    console.log();
});

