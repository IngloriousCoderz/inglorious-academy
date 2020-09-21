solveByCheating();

function solveByCheating() {
  const $inputField = getHiddenInputFieldFromPage();
  const code = getCodeFromPage();
  fakeUserInput($inputField, code);
}

function getHiddenInputFieldFromPage() {
  return $(".invisibleInput");
}

function getCodeFromPage() {
  const rawCode = $(".code").html();
  return cleanup(rawCode);
}

function fakeUserInput($input, code) {
  code.split("").forEach((char) => {
    if (isNewLine(char)) {
      sendCarriageReturnEvent($input);
    } else {
      sendInputEvent($input, char);
    }
  });
}

function cleanup(code) {
  return compose(
    stripTags,
    stripIndentation,
    stripComments,
    stripMultipleNewLines,
    fixLessThan,
    fixGreaterThan,
    fixAmpersand
  )(code);
}

function stripTags(str) {
  return str.replace(/<[^>]*>([^<]*)<[^>]*>/g, "$1");
}

function stripIndentation(str) {
  return str.replace(/ {2}/g, "");
}

function stripComments(str) {
  return str.replace(/\/{2}[^\n]*/g, "");
}

function stripMultipleNewLines(str) {
  return str.replace(/\n+/g, "\n");
}

function fixLessThan(str) {
  return str.replace(/&lt;/g, "<");
}

function fixGreaterThan(str) {
  return str.replace(/&gt;/g, ">");
}

function fixAmpersand(str) {
  return str.replace(/&amp;/g, "&");
}

function isNewLine(char) {
  return char.charCodeAt(0) === 10;
}

function sendCarriageReturnEvent($input) {
  const event = $.Event("keydown");
  event.keyCode = 13;
  $input.trigger(event);
}

function sendInputEvent($input, char) {
  $input.val(char).trigger("input");
}

function compose(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}
