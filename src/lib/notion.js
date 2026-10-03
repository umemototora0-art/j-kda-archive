import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getYokaiList() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) return [];

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      name: props.名前?.title[0]?.plain_text || '名称不明',
      ky_id: props.KY_ID?.rich_text[0]?.plain_text || 'KY-000',
      status: props.Status?.select?.name || props.Status?.status?.name || '公開済',
      scale: props.Scale?.select?.name || props.Scale?.rich_text[0]?.plain_text || '-',
      risk: props.RiskLevel?.select?.name || props.RiskLevel?.rich_text[0]?.plain_text || '-',
      overview: props.Overview?.rich_text[0]?.plain_text || '',
      avoidance: props.Avoidance?.rich_text[0]?.plain_text || '',
      literature: props.Literature?.rich_text[0]?.plain_text || '',
    };
  });
}
