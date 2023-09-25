import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { Movie } from '../Interface/movie.model';

@Directive({
  selector: '[appAppend]'
})
export class AppendDirective {
  @Input('appAppend') movieParam: Movie;

  constructor(private element: ElementRef, private renderer: Renderer2) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.movieParam.currentValue){
      const costQTY = changes.movieParam.currentValue.costs.length;
      const span = this.renderer.createElement('span');
      const myText = costQTY == 0 ? "There is no cost registeration" : ` ${costQTY} costs`;
      const text = this.renderer.createText(` ${myText}`);
      this.renderer.appendChild(span, text);
      this.renderer.appendChild(this.element.nativeElement, span);
    }
  }

}
