import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grafico-medidor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grafico-medidor.component.html',
  styleUrl: './grafico-medidor.component.scss',
})
export class GraficoMedidorComponent {
  @Input() currentValue; // Valor atual do medidor (entre 0 e 100)
  minValue = 0; // Valor mínimo
  maxValue = 100; // Valor máximo

  // Definir os segmentos de cor (verde, amarelo, laranja, vermelho)
  segments = [
    { from: 80, to: 100, color: '#28a745' }, // Verde
    { from: 50, to: 79, color: '#ffc107' }, // Amarelo
    { from: 25, to: 49, color: '#fd7e14' }, // Laranja
    { from: 0, to: 24, color: '#dc3545' }, // Vermelho
  ];

  getCurrentValue(): number {
    return (this.currentValue / 100) * 180;
  }

  calculateArc(from: number, to: number) {
    const fromPercentage =
      1 - (from - this.minValue) / (this.maxValue - this.minValue); // Inverte os percentuais
    const toPercentage =
      1 - (to - this.minValue) / (this.maxValue - this.minValue); // Inverte os percentuais
    const fromAngle = fromPercentage * -180; 
    const toAngle = toPercentage * -180;

    const largeArcFlag = to - from > 50 ? 1 : 0;
    const startX = 16 + 14 * Math.cos((fromAngle * Math.PI) / 180);
    const startY = 16 + 14 * Math.sin((fromAngle * Math.PI) / 180);
    const endX = 16 + 14 * Math.cos((toAngle * Math.PI) / 180);
    const endY = 16 + 14 * Math.sin((toAngle * Math.PI) / 180);

    const outerStartX = 16 + 16 * Math.cos((fromAngle * Math.PI) / 180);
    const outerStartY = 16 + 16 * Math.sin((fromAngle * Math.PI) / 180);
    const outerEndX = 16 + 16 * Math.cos((toAngle * Math.PI) / 180);
    const outerEndY = 16 + 16 * Math.sin((toAngle * Math.PI) / 180);

    
    return `
      M ${outerStartX} ${outerStartY} 
      A 16 16 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}  
      L ${endX} ${endY} 
      A 14 14 0 ${largeArcFlag} 0 ${startX} ${startY}       
      Z
    `;
  }
}
