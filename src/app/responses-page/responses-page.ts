import { Component, ElementRef, OnInit } from '@angular/core';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-responses-page',
  imports: [],
  templateUrl: './responses-page.html',
  styleUrl: './responses-page.css',
})
export class ResponsesPage implements OnInit {
  public responses: any[] = [];

  constructor(private elementRef: ElementRef, 
    public readonly sb: Supabase) {} 

  ngOnInit() {
    this.sb.getColor(this.elementRef);
    this.loadResponses();
  }

  async loadResponses() {
    this.responses = await this.sb.loadRandomResponses();
  }
}
