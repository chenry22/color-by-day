import { ElementRef, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Source - https://stackoverflow.com/a
  // Posted by SudoPlz, modified by community. See post 'Timeline' for change history
  // Retrieved 2025-11-18, License - CC BY-SA 4.0
  public colorIsDark(bgColor: string) {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) <= 186;
  }

  async getColor(elementRef: ElementRef) {
    let { data: color, error } = await this.supabase
      .from('color')
      .select('color')
      .order('lastDate', { ascending: false })

    if (!color) { return null; }

    // set colors of site
    elementRef.nativeElement.ownerDocument.body.style.backgroundColor = color[0].color;
    elementRef.nativeElement.ownerDocument.body.style.color = this.colorIsDark(color[0].color) ? '#FFFFFF' : '#000000';
    return color[0].color;
  }

  async submitExperience(name: string, experience: string, color: string) {
    const { data, error } = await this.supabase
      .from('responses')
      .insert([
        { name: name, response: experience, color: color},
      ])
    if (error != null) {
      console.log(error.message);
      return false;
    } else {
      return true;
    }
  }

  async loadRandomResponses(limit: number = 8) {
    const { data: responses, error } = await this.supabase.from("random_responses")
      .select("*")
      .limit(limit);
      
    if (error != null) {
      console.log(error.message);
      return [];
    }
    return responses;
  }
}
