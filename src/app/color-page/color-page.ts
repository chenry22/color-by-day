import { Component, ElementRef, OnInit } from '@angular/core';
import { GetColorName } from 'hex-color-to-color-name';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-color-page',
  imports: [],
  templateUrl: './color-page.html',
  styleUrl: './color-page.css',
})
export class ColorPage implements OnInit {
  constructor(private elementRef: ElementRef, private readonly sb: Supabase) {}

  public color = "---"
  public hexcode = "#---";
  
  ngOnInit() {
    this.loadColor();
  }

  async loadColor() {
    var color = await this.sb.getColor(this.elementRef);
    console.log(color);

    this.color = GetColorName(color);
    this.hexcode = color;
  }
}
