
export interface ResponseData {
    subdivisions:Subdivision[]
}


export interface Subdivision {
    id: number;
    code: string;
    name: string;
    longitude: number;
    latitude: number;
    fieldSurveyTerritoryId: number;
    marketId: number;
    subdivisionStatusId: number;
    surveyMethodId: number;
    activeSections: number;
    futureSections: number;
    builtOutSections: number;
    totalLots: number;
    fieldSurveyTerritoryName: string;
    marketName: string;
    marketAbbreviation: string;
    subdivisionStatusCode: string;
    surveyMethodCode: string;
    county: string;
    community: string | null;
    zoom17Date: string;
    zoom18Date: string;
    subdivisionGeometryId: number | null;
    subdivisionGeometryBoundingBoxId: number | null;
    subdivisionGeometryBoundaryId: number | null;
    subdivisionGeometryIntelligenceBoundaryId: number;
    subdivisionGeometryIntelligenceBoundaryStatusId: number;
    subdivisionGeometryIntelligenceBoundaryStatusCode: string;
    subdivisionGeometryIntelligenceBoundaryStatusChangeDate: string;
    nearMapImageDate: string;
    imageBoxId: number;
    mostRecentIPointBatchDate: string;
    iPoints: any | null;
    validatediPoints: any | null;
    subdivisionSpecificStatus: string;
  }
  