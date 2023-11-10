import { Column, JoinColumn, ManyToOne, ViewEntity } from 'typeorm'
import { CaseEntity } from './case.entity'
import { FlowChartElementEntity } from './flow-chart-element.entity'

@ViewEntity({
  name: 'flow_case_step_views',
  expression: `
      SELECT cs.data,
             cs.case_id,
             f.flow_id,
             f.name          AS flow_name,
             t.name          AS type_name,
             t.personal_name AS type_personal_name,
             c.pat_id
      FROM case_steps cs
               LEFT JOIN flow_chart_elements f ON f.flow_id = cs.flow_id
               LEFT JOIN flow_element_types t ON t.type_id = f.type_id
               LEFT JOIN cases c ON c.case_id = cs.case_id;
  `
})
export class FlowCaseStepView {
  @Column('text')
  data: string

  @Column({ name: 'case_id', type: 'uuid' })
  caseId: string

  @ManyToOne(() => CaseEntity, { eager: true })
  @JoinColumn({ name: 'case_id' })
  aCase: CaseEntity

  @ManyToOne(() => FlowChartElementEntity, { eager: true })
  @JoinColumn({ name: 'flow_id' })
  flow: FlowChartElementEntity

  @Column({ name: 'flow_name', type: 'varchar' })
  flowName: string

  @Column({ name: 'type_name', type: 'varchar' })
  typeName: string

  @Column({ name: 'type_personal_name', type: 'varchar' })
  personalName: string
}
