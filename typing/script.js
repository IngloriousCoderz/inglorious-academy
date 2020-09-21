$(".code")
  .html()
  .replace(/<[^>]*>([^<]*)<[^>]*>/g, "$1")
  .replace(/ {2}/g, "")
  .replace(/\/{2}[^\n]*/g, "")
  .replace(/\n+/g, "\n")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&")
  .split("")
  .forEach((char) => {
    if (char.charCodeAt(0) === 10) {
      const event = $.Event("keydown");
      event.keyCode = 13;
      $(".invisibleInput").trigger(event);
    } else {
      $(".invisibleInput").val(char).trigger("input");
    }
  });
