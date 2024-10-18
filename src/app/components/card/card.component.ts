import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { Card } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RatingModule, FormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CardComponent {
  @Input() card!: Card;
  
  x: any;
  cards: HTMLElement[] = [];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.cards = Array.from(this.el.nativeElement.querySelectorAll('.card'));
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.handleMouseMove(event);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.handleMouseMove(event);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd() {
    this.resetStyles();
  }

  private handleMouseMove(event: MouseEvent | TouchEvent) {
    const pos = event instanceof MouseEvent
      ? [event.offsetX, event.offsetY]
      : [event.touches[0].clientX, event.touches[0].clientY];
    
    event.preventDefault();

    this.cards.forEach(card => {
      const l = pos[0];
      const t = pos[1];
      const h = card.clientHeight;
      const w = card.clientWidth;
      const px = Math.abs(Math.floor(100 / w * l) - 100);
      const py = Math.abs(Math.floor(100 / h * t) - 100);
      
      const pa = (50 - px) + (50 - py);
      
      const lp = (50 + (px - 50) / 1.5);
      const tp = (50 + (py - 50) / 1.5);
      const px_spark = (50 + (px - 50) / 7);
      const py_spark = (50 + (py - 50) / 7);
      const p_opc = 20 + (Math.abs(pa) * 1.5);
      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / 1.5) * 0.5;

      const gradPos = `${(l / w) * 100}% ${(t / h) * 100}%`;
      const sprkPos = `${px_spark}% ${py_spark}%`;
      const opc = p_opc / 100;
      const tf = `rotateX(${ty}deg) rotateY(${tx}deg)`;

      card.style.setProperty('--grad-pos', gradPos);
      card.classList.add('active');

      card.style.transform = tf;
      card.classList.remove('active');
      card.classList.remove('animated');

      const style = `
        .card:hover:before { background-position: ${gradPos}; }
        .card:hover:after { background-position: ${sprkPos}; opacity: ${opc}; }
      `;
      this.setHoverStyles(style);
    });
    
    clearTimeout(this.x);
  }

  private resetStyles() {
    this.cards.forEach(card => {
      card.removeAttribute('style');
      card.classList.remove('active');
      this.x = setTimeout(() => {
        card.classList.add('animated');
      }, 2500);
    });
  }

  private setHoverStyles(style: string) {
    const styleTag = this.el.nativeElement.querySelector('.hover');
    styleTag.innerHTML = style;
  }
}
