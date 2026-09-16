import { NEW_DAY_SOLAR_HOMEPAGE, NEW_DAY_SOLAR_LOCAL_SEO, NEW_DAY_SOLAR_CRM } from './case-study-assets/new-day-solar'

export const NEW_DAY_SOLAR_CASE_STUDY = {
  slug: 'new-day-solar',
  title: 'New Day Solar',
  tags: ['Web Development', 'SEO', 'WordPress', 'GoHighLevel', 'Marketing Automation', 'Analytics'],
  excerpt: 'An integrated digital growth platform connecting local SEO, WordPress, CRM automation, attribution, and analytics to meaningful sales outcomes.',
  cover: NEW_DAY_SOLAR_HOMEPAGE,
  description: 'New Day Solar needed more than a website update. They needed a digital ecosystem capable of supporting long-term growth, improving lead visibility, and turning years of marketing data into something their sales team could actually use. We rebuilt their WordPress presence with conversion and local search in mind, developing a scalable SEO strategy that includes hundreds of targeted city, county, and neighborhood pages alongside long-form educational content designed to strengthen authority across Southern California.\n\nBehind the scenes, we transformed the way leads move through the business. Covert Communication rebuilt New Day Solar’s GoHighLevel infrastructure, sales pipeline, lead-disposition framework, and automated follow-up—from the first inquiry through appointments, demos, proposals, contracts, and long-term nurture. We also connected advertising attribution, offline conversion tracking, database segmentation, suppression management, and advanced analytics so marketing performance can be measured against meaningful sales outcomes—not simply clicks and form fills.\n\nThe result is an integrated growth platform built to attract homeowners locally, capture demand, organize the sales process, nurture opportunities automatically, and give New Day Solar a clearer picture of what is actually driving revenue.',
  images: [NEW_DAY_SOLAR_HOMEPAGE, NEW_DAY_SOLAR_LOCAL_SEO, NEW_DAY_SOLAR_CRM],
}

export function replaceWolfRiver(studies) {
  return [NEW_DAY_SOLAR_CASE_STUDY, ...studies.filter(study => study.slug !== 'wolf-river-construction')]
}
