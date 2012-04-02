# Demiurge

See blog post http://creynders.wordpress.com/2012/04/01/demiurge-3-types-of-javascript-inheritance-2/
for full explanation and examples

## Adding Demiurge as a Git module

If you want to use Demiurge as a git module, you could obviously use the ```master``` branch, but a better solution would be to use the ```gh-pages``` branch which serves the ```bin``` directory with the minified and normal versions of the lib, it acts as a linking archive and therefore is better suited for this purpose.

Navigate to your project directory in terminal, and lets say you want to add it to a ```vender``` directory:

```
git add submodule git@github.com:creynders/demiurge.git vendor/demiurge
cd vendor/demiurge
git checkout gh-pages
git branch -d master
```
