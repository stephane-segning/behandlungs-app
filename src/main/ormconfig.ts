import { CaseEntity } from './entities/case.entity'
import { CaseStepEntity } from './entities/case-step.entity'
import { FlowCaseStepView } from './entities/flow-case-step-view.entity'
import { FlowChartElementEntity } from './entities/flow-chart-element.entity'
import { FlowEdgeEntity } from './entities/flow-edge-element.entity'
import { FlowElementTypeEntity } from './entities/flow-element-type.entity'
import { PatientEntity } from './entities/patient.entity'

export const defaultOptions = () => ({
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    CaseEntity,
    CaseStepEntity,
    FlowCaseStepView,
    FlowChartElementEntity,
    FlowEdgeEntity,
    FlowElementTypeEntity,
    PatientEntity
  ],
  migrations: ['src/typeorm/migration/**/*.ts'],
  subscribers: ['src/typeorm/subscriber/**/*.ts'],
  seeds: ['src/typeorm/seeds/**/*.ts']
})
