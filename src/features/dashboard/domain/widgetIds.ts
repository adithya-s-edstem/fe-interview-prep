export const widgetIds = ['sales', 'activeUsers', 'recentOrders'] as const;

export type WidgetId = (typeof widgetIds)[number];
