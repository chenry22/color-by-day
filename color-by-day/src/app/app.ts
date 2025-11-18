import { Component, ElementRef, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createClient } from '@supabase/supabase-js'
import { GetColorName } from 'hex-color-to-color-name';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('color-by-day');
  constructor(private elementRef: ElementRef) {}

  public color = "---"
  public hexcode = "#---";
  
  // PUBLIC url and key
  private supabaseUrl = 'https://scqzsjyjpdhwxqhhxqda.supabase.co'
  private supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcXpzanlqcGRod3hxaGh4cWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0Mjc0NzksImV4cCI6MjA3OTAwMzQ3OX0.lmQm3ht2DyeQ_nUYnP3u6HpFUYdoYjvIssTGmP11Y8Y"
  private supabase = createClient(this.supabaseUrl, this.supabaseKey)
  
  ngOnInit() {
    this.loadColor();
  }

  async loadColor() {
    let { data: color, error } = await this.supabase
      .from('color')
      .select('color')
    if (!color) { return; }

    console.log(color);

    this.color = GetColorName(color[0].color);
    this.hexcode = color[0].color;
     this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.hexcode;
  }
}
