import React from 'react';

export interface Section {
  id: string;
  title: string;
  subsections?: Section[];
}

export interface ContentMap {
  [key: string]: React.FC;
}