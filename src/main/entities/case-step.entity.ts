import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CaseEntity } from './case.entity'
import { FlowChartElementEntity } from './flow-chart-element.entity'

@Entity({ name: 'case_steps' })
export class CaseStepEntity {
  @PrimaryGeneratedColumn('increment', { name: 'step_id' })
  id: number

  @ManyToOne(() => CaseEntity, { nullable: false })
  @JoinColumn({ name: 'case_id' })
  caseE: CaseEntity

  @ManyToOne(() => FlowChartElementEntity, { nullable: false })
  @JoinColumn({ name: 'flow_id' })
  flowChart: FlowChartElementEntity

  @Column('text', { nullable: false })
  data: string
}
