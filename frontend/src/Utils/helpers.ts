import Handlebars from "handlebars"
export const helpers = {
    uppercase: (text: string): string => text.toUpperCase(),
    lowercase: (text: string): string => text.toLowerCase(),
    wrapped: (tag: string | null, className: string | null, text: string) => {
        return new Handlebars.SafeString(`<${tag || "span"} class="${className}">${text}</${tag || "span"}>`)
    },


}
// nested helper -> {{loud (testhelper (blank title.eng "Part") "Wardo")}}