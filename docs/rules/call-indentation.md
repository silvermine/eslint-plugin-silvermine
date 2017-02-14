# Check indentation of function call (call-indentation)

This rule aims to keep consistent formatting on a function call.

Only one multiline argument is allowed per function call in either
format.

## Option 1 - All start on the same line
A call to a function that spans multiple lines because of an array,
object or anonymous function call should begin and end with the
same indentation. Each argument should start on the same line that
the previous argument ended on.

## Option 2 - Each argument starts on a new line

A call to a function that spans multiple lines because of the length
of the arguments should have each argument on its own line. The closing
parenthesis should be on its own line with the same indentation as
the function call.

### Invalid examples:

```js
_.map(languages,
   function(lang) {
      return lang.name;
   });
```
The inner function should have started on the same line as the outer
and the inner function's closing bracket should be indented to the same level
as the line of the outer function.

```
fn(arg1, arg2,
   arg3);
```
The arg3 should have been on the same line as the other two.

```
promise.then(function() {
   yayItWorked();
}, function(err) {
   ohNoSomethingWentWrong(err);
});

promise.then(
   function() {
      yayItWorked();
   },
   function(err) {
      ohNoSomethingWentWrong(err);
   }
);
```
Only one multiline argument is allowed.

### Valid examples:

```js
_.map(languages, function(lang) {
   return lang.name;
});

fn(
   arg1,
   arg2,
   arg3
);

_.reduce(list, function(memo, item) {
   return memo + item;
}, 0);
```
