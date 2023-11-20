import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FlowEdgeEntity } from './flow-edge-element.entity'
import { FlowElementTypeEntity } from './flow-element-type.entity'

@Entity({ name: 'flow_chart_elements' })
export class FlowChartElementEntity {
  @PrimaryGeneratedColumn('increment', { name: 'flow_id' })
  id: string

  @OneToMany(() => FlowEdgeEntity, (flowEdge) => flowEdge.startNode)
  startingEdges: FlowEdgeEntity[]

  @OneToMany(() => FlowEdgeEntity, (flowEdge) => flowEdge.endNode)
  endingEdges: FlowEdgeEntity[]

  @ManyToOne(() => FlowElementTypeEntity, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: FlowElementTypeEntity

  @Column({ length: 50, type: 'varchar' })
  name: string
}
