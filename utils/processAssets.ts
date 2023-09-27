type AssetResponse = {
    sys: {
      type: string;
      total: number;
      skip: number;
      limit: number;
    };
    items: Array<{
      sys: {
        id: string;
      };
      fields: {
        file: {
          url: string;
        };
      };
    }>;
  };
  
  export const processAssets = (response: AssetResponse) => {
    const assetLookup: Record<string, string> = {};
  
    for (const item of response.items) {
      assetLookup[item.sys.id] = item.fields.file.url;
    }
  
    return assetLookup;
  };
  