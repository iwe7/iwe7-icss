import { Injectable, ElementRef } from "@angular/core";
import { Observable, merge } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as _ from "lodash";
@Injectable({
  providedIn: "root"
})
export class Iwe7IcssService {
  state: any = {};
  constructor() { }
  init(ob: Observable<{ [key: string]: string }>, ele?: ElementRef): Observable<any> {
    // 合并流
    return ob.pipe(
      map(style => {
        this.state = _.defaultsDeep(style, this.state);
        this.styledash(ele.nativeElement, this.state);
        return this.state;
      }),
      map(style => {
        return style;
      })
    );
  }

  private parse(val: any) {
    return typeof val === "boolean" ? (!!val ? 1 : 0) : val;
  }

  private styledash(target: HTMLElement, key, val?: any) {
    if (typeof key === "object" && val === undefined) {
      return Object.keys(key).forEach(subKey =>
        this.styledash(target, subKey, key[subKey])
      );
    }
    if (typeof val === "object") {
      return Object.keys(val).forEach(subkey => {
        this.styledash(target, `${key}-${subkey}`, val[subkey]);
      });
    }
    return target.style.setProperty(`--${key}`, this.parse(val) as string);
  }
}
