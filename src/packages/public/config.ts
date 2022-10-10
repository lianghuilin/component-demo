export const DEF_POSITION_AROUND: string[] = ['left', 'right']
export const DEF_POSITION_UP_DOWN: string[] = ['up', 'down']
export interface PositionMap {
    around: string[];
    upDown: string[];
}
export const positionMap: PositionMap = {
  around: DEF_POSITION_AROUND,
  upDown: DEF_POSITION_UP_DOWN
}
