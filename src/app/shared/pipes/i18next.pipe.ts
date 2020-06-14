import { Inject, Injectable, Pipe, PipeTransform } from "@angular/core";
import { I18NEXT_SERVICE, ITranslationService } from "angular-i18next";

@Injectable()
@Pipe({
  name: "i18nextFormat"
})
export class I18NextFormatPipe implements PipeTransform {
  constructor(
    @Inject(I18NEXT_SERVICE) private translateI18Next: ITranslationService
  ) {
    console.log("inejecting...");
  }

  public transform(value: string, options: Object | string): string {
    const opts: any =
      typeof options === "string" ? { format: options } : options;

    if (opts && opts.format) {
      return this.translateI18Next.t(value, opts.format);
    } else {
      return this.translateI18Next.t(value);
    }
  }
}
